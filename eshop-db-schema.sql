/*
  VS Skate-Shop Database Schema
  -----------------------------
  Purpose:
    - Support an e-commerce platform for skateboarding-related products 
      (e.g., skateboards, trucks, wheels).
    - Handle product variations (by size), multilingual descriptions, 
      tags, reviews, related products, discounts, carts, orders, 
      shipping addresses, and Stripe-based payments.

  Highlights:
    - UUID primary keys for products, orders, carts, etc., for 
      more seamless integration with external systems and easier
      unique identification.
    - A dedicated table for each logical entity (e.g., product, discount, order).
    - Constraint-based data integrity (e.g., unique constraints, check constraints).
    - Trigger function to auto-update 'updated_at' columns on every row update.
*/

-- -------------------------------------------------------------------
-- 1) Enable UUID generation extension (for generating UUIDs)
-- -------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------
-- Table: product_categories
-- -------------------------------------------------------------------
-- This table defines top-level categories for products ("Skateboards", 
-- "Trucks", "Wheels"). 
-- Each product belongs to exactly one category (see 'products' table).
-- category_name is unique to prevent duplicates.
-- -------------------------------------------------------------------
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY, 
    category_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------
-- Table: sizes
-- -------------------------------------------------------------------
-- Defines valid sizes for a given category. For instance, for skateboards, 
-- sizes might be 7.5", 7.75", 8.0", etc. For wheels, 52mm, 54mm, etc.
-- The numeric(5,3) type helps store up to three decimal places (e.g., 8.125 for deck size).
-- unique_category_size ensures we cannot define two identical sizes for the same category
-- -------------------------------------------------------------------
CREATE TABLE sizes (
    size_id SERIAL PRIMARY KEY,
    size NUMERIC(5, 3) NOT NULL, 
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) 
        REFERENCES product_categories(category_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT unique_category_size UNIQUE (size, category_id)
);

-- -------------------------------------------------------------------
-- Table: products
-- -------------------------------------------------------------------
-- Main product table storing basic product info:
--  - price: numeric(10,2) to accurately handle currency. 
--  - deleted_at: a "soft delete" column, if set, the product is considered removed 
--    from the store without physically deleting the row.
-- The ON DELETE RESTRICT rule ensures we don't delete a category while
-- there are still products linked to it. This preserves referential
-- integrity and prevents orphaned product records.
-- -------------------------------------------------------------------
CREATE TABLE products (
    product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    main_image_id UUID NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_category
    FOREIGN KEY (category_id) 
        REFERENCES product_categories(category_id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

-- -------------------------------------------------------------------
-- Table: product_images
-- -------------------------------------------------------------------
-- Product images are stored in a separate table to allow multiple images per product.
-- -------------------------------------------------------------------
CREATE TABLE product_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);


ALTER TABLE products
    ADD CONSTRAINT fk_main_image FOREIGN KEY (main_image_id) 
    REFERENCES product_images(id) 
    ON DELETE SET NULL;

-- -------------------------------------------------------------------
-- Table: product_variations
-- -------------------------------------------------------------------
-- Each row represents a specific size variant of a product (e.g., a board in size 8.0) 
-- and how many units are in stock. 
-- This design allows multiple variations for the same product, each with its own stock count.
-- -------------------------------------------------------------------
CREATE TABLE product_variations (
    variation_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL, 
    size_id INT NOT NULL, 
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_size
        FOREIGN KEY (size_id) 
        REFERENCES sizes(size_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- -------------------------------------------------------------------
-- Table: product_descriptions
-- -------------------------------------------------------------------
-- Allows storing product descriptions in multiple languages. 
-- Currently supports English (en) and Dutch (nl). Could be extended if needed.
-- -------------------------------------------------------------------
CREATE TABLE product_descriptions (
    description_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    language_code VARCHAR(2) NOT NULL CHECK (language_code IN ('en', 'nl')),
    description VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- -------------------------------------------------------------------
-- Table: tags
-- -------------------------------------------------------------------
-- Stores all possible tags that can be assigned to products. 
-- For example, "New", "Last in Inventory", "On Sale", etc.
-- -------------------------------------------------------------------
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------
-- Table: product_tags
-- -------------------------------------------------------------------
-- A many-to-many linking table between products and tags. 
-- Each product can have multiple tags, and each tag can be used by multiple products.
-- The unique constraint prevents assigning the same tag to a product more than once.
-- -------------------------------------------------------------------
CREATE TABLE product_tags (
    product_tag_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_tag
        FOREIGN KEY (tag_id) 
        REFERENCES tags(tag_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT unique_product_tag UNIQUE (product_id, tag_id)
);

-- -------------------------------------------------------------------
-- Table: reviews
-- -------------------------------------------------------------------
-- Stores customer reviews for products. 
--  - rating: integer [1..5].
--  - flagged: indicates if a review is flagged for admin attention (e.g., inappropriate content).
--  - helpful_votes: can be incremented if other customers mark a review as helpful.
-- -------------------------------------------------------------------
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    flagged BOOLEAN DEFAULT FALSE,
    customer_name VARCHAR(100) NOT NULL, 
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text VARCHAR(1000),
    helpful_votes INT DEFAULT 0 CHECK (helpful_votes >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- -------------------------------------------------------------------
-- Table: product_related_products
-- -------------------------------------------------------------------
-- Self-referencing many-to-many relation. 
--  - e.g., "product A" is related to "product B" for recommendation purposes.
--  - The primary key is (product_id, related_product_id).
--  - Self-reference is disallowed (check_no_self_reference).
-- -------------------------------------------------------------------
CREATE TABLE product_related_products (
    product_id UUID NOT NULL,
    related_product_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_related_product
        FOREIGN KEY (related_product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    PRIMARY KEY (product_id, related_product_id),
    CONSTRAINT check_no_self_reference CHECK (product_id <> related_product_id)
);

-- -------------------------------------------------------------------
-- Table: discounts
-- -------------------------------------------------------------------
-- Each product may have at most one discount entry. 
--  - discount_percentage: e.g., 15.00 means 15% off.
--  - valid_from: the start date/time for the discount.
--  - valid_until: optional end date/time; if NULL, the discount remains valid indefinitely.
-- The 'unique_discount_per_product' constraint enforces only one discount record per product.
-- -------------------------------------------------------------------
CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    discount_percentage NUMERIC(5, 2) NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT unique_discount_per_product UNIQUE (product_id),
    CONSTRAINT check_valid_discount_date CHECK (valid_until IS NULL OR valid_until > valid_from)
);

-- -------------------------------------------------------------------
-- Table: carts
-- -------------------------------------------------------------------
-- Represents a shopping cart
-- A single cart can hold multiple items (see cart_items).
-- -------------------------------------------------------------------
CREATE TABLE carts (
    cart_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------
-- Table: cart_items
-- -------------------------------------------------------------------
-- Holds line items within a cart. Each line references a specific product and size.
-- The unique constraint (cart_id, product_id, size_id) ensures a cart cannot contain 
-- multiple entries for the exact same product/size combination.
-- -------------------------------------------------------------------
CREATE TABLE cart_items (
    cart_item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    size_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0 AND quantity <= 999),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart
        FOREIGN KEY (cart_id) 
        REFERENCES carts(cart_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_size
        FOREIGN KEY (size_id) 
        REFERENCES sizes(size_id) 
        ON DELETE CASCADE,
    CONSTRAINT unique_cart_product_size UNIQUE (cart_id, product_id, size_id)
);

-- -------------------------------------------------------------------
-- Table: countries
-- -------------------------------------------------------------------
-- Master list of valid countries for shipping/billing addresses. 
-- code: two-letter country code (e.g., "US", "NL").
-- -------------------------------------------------------------------
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code CHAR(2) NOT NULL UNIQUE, 
    name VARCHAR(100) NOT NULL
);

-- -------------------------------------------------------------------
-- Table: shipping_addresses
-- -------------------------------------------------------------------
-- Stores address details for orders. 
-- 'address_id' is a UUID to uniquely identify each address record. 
-- 'country_id' references the countries table, restricting addresses to known countries.
-- 'unique_full_address' ensures no duplicate addresses are stored.
-- -------------------------------------------------------------------
CREATE TABLE shipping_addresses (
    address_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_country
        FOREIGN KEY (country_id) 
        REFERENCES countries(id) 
        ON DELETE RESTRICT,
    CONSTRAINT unique_full_address UNIQUE (
        first_name,
        last_name,
        email,
        address,
        city,
        state_province,
        postal_code,
        country_id
    )
);


-- -------------------------------------------------------------------
-- Table: orders
-- -------------------------------------------------------------------
-- Contains orders submitted for checkout. 
-- state: enumerates the order lifecycle states 
--   (created, paid, shipped, cancelled, refunded).
-- shipping_address_id must be valid in shipping_addresses. 
-- cart_id is optionally retained (SET NULL on delete).
-- -------------------------------------------------------------------
CREATE TABLE orders (
    order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID,
    shipping_address_id UUID NOT NULL,
    state VARCHAR(50) NOT NULL CHECK (state IN ('created', 'paid', 'shipped', 'cancelled', 'refunded')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart
        FOREIGN KEY (cart_id) 
        REFERENCES carts(cart_id) 
        ON DELETE SET NULL,
    CONSTRAINT fk_shipping_address
        FOREIGN KEY (shipping_address_id) 
        REFERENCES shipping_addresses(address_id) 
        ON DELETE RESTRICT
);

-- -------------------------------------------------------------------
-- Table: order_items
-- -------------------------------------------------------------------
-- Reflects the products (and their variations) that were purchased in an order. 
-- 'price' stores the actual purchase price at the time of sale (including any discount).
-- 'quantity' must be > 0 and within a reasonable upper limit (999).
-- -------------------------------------------------------------------
CREATE TABLE order_items (
    order_item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    size_id INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0 AND quantity <= 999),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_size
        FOREIGN KEY (size_id) 
        REFERENCES sizes(size_id) 
        ON DELETE CASCADE
);

-- -------------------------------------------------------------------
-- Table: payments
-- -------------------------------------------------------------------
-- Records payment information for orders. 
--  - external_payment_id: the identifier provided by Stripe.
--  - status: the payment status in our system (success, failed, awaiting_payment, cancelled).
-- -------------------------------------------------------------------
CREATE TABLE payments (
    payment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL,
    external_payment_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('success', 'failed', 'awaiting_payment', 'cancelled')),
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) 
        ON DELETE CASCADE, 
    CONSTRAINT unique_external_payment_id UNIQUE (external_payment_id)
);

-- -------------------------------------------------------------------
-- Table: payment_logs
-- -------------------------------------------------------------------
-- Logs incoming Stripe events or updates for the order payment lifecycle. 
--  - external_payment_id: unique to each Stripe event
--  - payment_status: captured from the event (e.g., 'paid', 'unpaid', 'awaiting_payment').
--  - type: the type of payment (e.g., 'order'). Later can be e.g. 'subscription'.
-- -------------------------------------------------------------------
CREATE TABLE payment_logs (
    log_id SERIAL PRIMARY KEY,
    external_payment_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('order')),
    message JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_external_payment_status_type UNIQUE (external_payment_id, status, type)
);

-- -------------------------------------------------------------------
-- 2) Indexes
-- -------------------------------------------------------------------
-- Creates indexes on key columns to speed up searches, foreign key lookups, 
-- or common filtering operations.
-- -------------------------------------------------------------------
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_sizes_category_id ON sizes (category_id);
CREATE INDEX idx_product_images_product_id ON product_images (product_id);
CREATE INDEX idx_products_main_image_id ON products (main_image_id);
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
CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_payments_order_id ON payments (order_id);
CREATE INDEX idx_payment_logs_external_payment_id ON payment_logs (external_payment_id);

-- -------------------------------------------------------------------
-- 3) Trigger function: update_updated_at
-- -------------------------------------------------------------------
-- This function automatically updates the 'updated_at' field on 
-- any row just before it is updated. Useful for auditing purposes 
-- and ensuring we always have the latest modification timestamp.
-- -------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------
-- 5) Apply the update_updated_at trigger to all relevant tables
-- -------------------------------------------------------------------
-- Loops through the specified tables and creates a BEFORE UPDATE trigger 
-- that invokes 'update_updated_at()', ensuring the updated_at column 
-- is always refreshed on each update.
-- -------------------------------------------------------------------
DO $$
DECLARE
    tables TEXT[] := ARRAY[
        'product_categories', 'sizes', 'product_images', 'products', 'product_variations', 
        'product_descriptions', 'tags', 'product_tags', 'reviews', 
        'product_related_products', 'discounts', 'carts', 'cart_items', 
        'orders', 'order_items', 'payments', 'payment_logs'
    ];
BEGIN
    FOR i IN 1..ARRAY_LENGTH(tables, 1) LOOP
        EXECUTE format(
            'CREATE TRIGGER update_%I_updated_at
             BEFORE UPDATE ON %I
             FOR EACH ROW
             EXECUTE FUNCTION update_updated_at();', 
            tables[i], tables[i]
        );
    END LOOP;
END $$;
