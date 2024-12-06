/*
PostgreSQL Database Schema for VS skate-Shop

This schema is designed to support an e-commerce platform for products like skateboards, trucks, and wheels.
The schema includes support for product variations (e.g., size), multilingual descriptions, tags, reviews, related products, and discounts. Only one image URL is stored per product, and each product can have one active discount at any given time.

Tables:
1. product_categories: stores product categories to help classify products (e.g., skateboards, trucks).
2. products: holds main product information, including name, price, a single image URL, and category association.
3. product_variations: manages size-based variations for each product, with stock quantity per size.
4. product_descriptions: allows for multilingual descriptions for each product.
5. tags: stores available tags (e.g., "on sale", "new"), which can be associated with multiple products.
6. product_tags: many-to-many association between products and tags, allowing each product to have multiple unique tags. A unique constraint on (product_id, tag_id) ensures that each tag can only be associated with a product once.
7. reviews: stores customer reviews for products, including a rating system from 1 to 5.
8. product_related_products: links related products to each other to facilitate recommendations.
9. discounts: stores discount information per product, allowing one active discount per product at any time.

Indexes and Triggers:
- Foreign key indexes are created to optimize join operations.
- A unique constraint on product_id in the discounts table ensures only one discount per product at a time.
- Triggers are included to automatically update the `updated_at` timestamp whenever a row is modified, 
  maintaining an accurate record of the latest updates.

*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop all tables if they already exist
-- DROP TABLE IF EXISTS product_categories CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS product_variations CASCADE;
-- DROP TABLE IF EXISTS product_descriptions CASCADE;
-- DROP TABLE IF EXISTS sizes CASCADE;
-- DROP TABLE IF EXISTS tags CASCADE;
-- DROP TABLE IF EXISTS product_tags CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS product_related_products CASCADE;
-- DROP TABLE IF EXISTS discounts CASCADE;

-- Creating product_categories table
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Creating sizes table
CREATE TABLE sizes (
    size_id SERIAL PRIMARY KEY,
    size NUMERIC(5, 3) NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES product_categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT unique_category_size UNIQUE (size, category_id) -- Ensures size uniqueness within a category
);

-- Creating products table with a single image URL
CREATE TABLE products (
    product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES product_categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Creating product_variations table for size-based variations
CREATE TABLE product_variations (
    variation_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL, 
    size_id INT NOT NULL, 
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_size FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creating product_descriptions table with multilingual support
CREATE TABLE product_descriptions (
    description_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    language_code VARCHAR(2) NOT NULL CHECK (language_code IN ('en', 'nl')),
    description VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creating tags table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Creating product_tags table to associate products with tags
CREATE TABLE product_tags (
    product_tag_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT unique_product_tag UNIQUE (product_id, tag_id)
);

-- Creating reviews table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    flagged BOOLEAN DEFAULT FALSE,
    customer_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5), 
    review_text VARCHAR(1000),
    review_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    helpful_votes INT DEFAULT 0 CHECK (helpful_votes >= 0), 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creating product_related_products table for related product linking
CREATE TABLE product_related_products (
    product_id UUID NOT NULL,
    related_product_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_related_product FOREIGN KEY (related_product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (product_id, related_product_id)
);

-- Creating discounts table with unique constraint to allow only one discount per product
CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    discount_percentage NUMERIC(5, 2) NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT unique_discount_per_product UNIQUE (product_id)
);


CREATE TABLE carts (
    cart_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cart_items (
    cart_item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    size_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_size FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE CASCADE
);

-- Creating indexes for foreign keys
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_sizes_category_id ON sizes (category_id);
CREATE INDEX idx_product_variations_product_id ON product_variations (product_id);
CREATE INDEX idx_product_variations_size_id ON product_variations (size_id);
CREATE INDEX idx_product_descriptions_product_id ON product_descriptions (product_id);
CREATE INDEX idx_product_tags_product_id ON product_tags (product_id);
CREATE INDEX idx_product_tags_tag_id ON product_tags (tag_id);
CREATE INDEX idx_reviews_product_id ON reviews (product_id);
CREATE INDEX idx_product_related_products_product_id ON product_related_products (product_id);
CREATE INDEX idx_product_related_products_related_product_id ON product_related_products (related_product_id);
CREATE INDEX idx_discounts_product_id ON discounts (product_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items (cart_id);

-- Triggers to update updated_at timestamp on each table
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Adding triggers to update updated_at column before any update
-- Creating a trigger for each table
CREATE TRIGGER update_product_categories_updated_at
BEFORE UPDATE ON product_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_variations_updated_at
BEFORE UPDATE ON product_variations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_descriptions_updated_at
BEFORE UPDATE ON product_descriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sizes_updated_at
BEFORE UPDATE ON sizes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tags_updated_at
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_tags_updated_at
BEFORE UPDATE ON product_tags
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_related_products_updated_at
BEFORE UPDATE ON product_related_products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_discounts_updated_at
BEFORE UPDATE ON discounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_carts_updated_at
BEFORE UPDATE ON carts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

