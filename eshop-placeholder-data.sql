CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Inserting common product categories
INSERT INTO product_categories (category_name) VALUES 
    ('Decks'), ('Trucks'), ('Wheels');

-- Inserting common tags
INSERT INTO tags (tag_name) VALUES 
    ('On Sale'), ('New'), ('Last in Inventory');

-- Inserting specific products for skateboards, trucks, and wheels
INSERT INTO products (product_id, category_id, product_name, price, image_url) VALUES
    (uuid_generate_v4(), 1, 'Element Section Complete Skateboard', 120.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Santa Cruz Classic Dot Skateboard', 130.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/676/3800/CarverHoboDeck2021_REVS2-1__95601.1682428803.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Enjoi Whitey Panda Skateboard', 115.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/506/3014/CarverAipaDeck__55789.1686061692.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Almost Mullen Uber Light Skateboard', 140.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/505/3013/CarverTyler777Deck__76503.1686061667.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Powell Peralta Ripper Skateboard', 135.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/362/2901/Carver2020GlassOffDeck__88947.1686060559.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Globe G1 Argo Skateboard', 110.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/361/2900/Carver2020BlueHazeDeck__32701.1676680379.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Zero Single Skull Skateboard', 125.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/360/2899/Carver2020EmeraldPeakDeck__05392.1685461074.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Girl Carroll 93 Til Skateboard', 128.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/354/4088/CarverUSABoosterDeck__23968.1693956486.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Plan B Team OG Skateboard', 145.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/921/4727/Psychedelic-Sunset-Deck__79585.1729690900.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Blind OG Logo Skateboard', 118.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/912/4725/Wavy-Davy_Deck__39602.1729638935.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Baker Brand Logo Skateboard', 125.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/924/4726/Space-Case-Deck__04314.1729690824.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Chocolate Alvarez Hologram Skateboard', 132.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Anti-Hero Classic Eagle Skateboard', 127.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Toy Machine Vice Dead Monster Skateboard', 122.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Creature Logo Complete Skateboard', 130.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Real Classic Oval Complete Skateboard', 138.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/600x600/products/911/4724/Wavy-Davy-C5_Hero__55266.1729638867.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Foundation Star & Moon Skateboard', 115.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/674/3744/2023_decks_17__45584.1685460864.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Primitive Rodriguez Samurai Skateboard', 150.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/673/3743/2023_decks_5__34141.1685460849.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Darkstar First Push Skateboard', 112.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/675/3745/2023_decks_16__43613.1685460873.jpg?c=1'),
    (uuid_generate_v4(), 1, 'Jart Classic Complete Skateboard', 119.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/380x380/products/918/4728/Sunburst-Deck__43995.1729690972.jpg?c=1'),

    (uuid_generate_v4(), 2, 'Independent Stage 11 Standard Trucks', 60.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Thunder Polished Team Trucks', 58.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Venture Polished Low Trucks', 55.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Tensor Mag Light Trucks', 65.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Krux K5 Galaxy Trucks', 62.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Ace AF1 Trucks', 64.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Royal Trucks Raw', 57.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Gullwing Mission Trucks', 59.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Paris V3 Trucks', 66.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),
    (uuid_generate_v4(), 2, 'Caliber II Fifty Trucks', 63.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/804/4231/CARVER_C7-TRUCK-SET-INDIGO-BLUE__72510.1698901586.png?c=1'),

    (uuid_generate_v4(), 3, 'Spitfire Formula Four Wheels', 40.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Bones STF V1 Wheels', 45.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Ricta Clouds Cruiser Wheels', 42.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'OJ Super Juice Wheels', 38.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Sector 9 Nineballs Wheels', 43.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Powell Peralta G-Slides Wheels', 44.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Slime Balls OG Wheels', 39.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Orangatang Kegel Wheels', 50.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Cloud Ride Cruiser Wheels', 41.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1'),
    (uuid_generate_v4(), 3, 'Arbor Easyrider Bogart Wheels', 46.00, 'https://cdn11.bigcommerce.com/s-icfw6t6sn3/images/stencil/1280x1280/products/819/4314/CARVER_ROUNDHOUSE_65MM_83A_SLICK_GREEN_GLO__48523.1703803312.png?c=1');

-- Inserting product descriptions (in English and Dutch)
INSERT INTO product_descriptions (product_id, language_code, description) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'en', 'Element Section Skateboard is a versatile board perfect for riders of all skill levels.'),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'nl', 'Element Section Skateboard is een veelzijdig board, perfect voor rijders van elk niveau.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'en', 'Santa Cruz Classic Dot Skateboard offers timeless style and high durability.'),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'nl', 'Santa Cruz Classic Dot Skateboard biedt tijdloze stijl en hoge duurzaamheid.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'en', 'Enjoi Whitey Panda Skateboard, known for its fun and vibrant design, is a standout.'),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'nl', 'Enjoi Whitey Panda Skateboard staat bekend om zijn leuke en levendige ontwerp.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'en', 'Almost Mullen Uber Light Skateboard is ultra-lightweight, great for tricks.'),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'nl', 'Almost Mullen Uber Light Skateboard is ultralicht, geweldig voor trucs.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'en', 'Powell Peralta Ripper Skateboard reissues an iconic graphic with modern performance.'),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'nl', 'Powell Peralta Ripper Skateboard heruitgave van een iconisch ontwerp met moderne prestaties.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'en', 'Globe G1 Argo Skateboard is durable, offering excellent control for everyday skating.'),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'nl', 'Globe G1 Argo Skateboard is duurzaam en biedt uitstekende controle voor dagelijks skaten.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'en', 'Zero Single Skull Skateboard, bold and eye-catching, is built for a powerful ride.'),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'nl', 'Zero Single Skull Skateboard, gedurfd en opvallend, is gebouwd voor een krachtige rit.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'en', 'Girl Carroll 93 Til Skateboard delivers a smooth ride with classic graphics.'),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'nl', 'Girl Carroll 93 Til Skateboard biedt een soepele rit met klassieke graphics.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'en', 'Plan B Team OG Skateboard brings a strong build for street and park skating.'),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'nl', 'Plan B Team OG Skateboard heeft een sterke constructie voor straat- en park skating.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'en', 'Blind OG Logo Skateboard is a sturdy choice with a legendary design.'),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'nl', 'Blind OG Logo Skateboard is een stevige keuze met een legendarisch ontwerp.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Baker Brand Logo Skateboard'), 'en', 'Baker Brand Logo Skateboard, known for high quality and iconic branding.'),
    ((SELECT product_id FROM products WHERE product_name = 'Baker Brand Logo Skateboard'), 'nl', 'Baker Brand Logo Skateboard, bekend om zijn hoge kwaliteit en iconisch merk.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Chocolate Alvarez Hologram Skateboard'), 'en', 'Chocolate Alvarez Hologram Skateboard offers durability and unique graphics.'),
    ((SELECT product_id FROM products WHERE product_name = 'Chocolate Alvarez Hologram Skateboard'), 'nl', 'Chocolate Alvarez Hologram Skateboard biedt duurzaamheid en unieke graphics.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Anti-Hero Classic Eagle Skateboard'), 'en', 'Anti-Hero Classic Eagle Skateboard is built tough for all terrains.'),
    ((SELECT product_id FROM products WHERE product_name = 'Anti-Hero Classic Eagle Skateboard'), 'nl', 'Anti-Hero Classic Eagle Skateboard is gebouwd voor alle terreinen.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Toy Machine Vice Dead Monster Skateboard'), 'en', 'Toy Machine Vice Dead Monster Skateboard stands out with its bold artwork.'),
    ((SELECT product_id FROM products WHERE product_name = 'Toy Machine Vice Dead Monster Skateboard'), 'nl', 'Toy Machine Vice Dead Monster Skateboard valt op met zijn gedurfde artwork.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Creature Logo Complete Skateboard'), 'en', 'Creature Logo Complete Skateboard provides a durable setup for all skill levels.'),
    ((SELECT product_id FROM products WHERE product_name = 'Creature Logo Complete Skateboard'), 'nl', 'Creature Logo Complete Skateboard biedt een duurzaam setup voor alle niveaus.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Real Classic Oval Complete Skateboard'), 'en', 'Real Classic Oval Complete Skateboard is a solid choice with a classic look.'),
    ((SELECT product_id FROM products WHERE product_name = 'Real Classic Oval Complete Skateboard'), 'nl', 'Real Classic Oval Complete Skateboard is een solide keuze met een klassieke uitstraling.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Foundation Star & Moon Skateboard'), 'en', 'Foundation Star & Moon Skateboard is built for a smooth and steady ride.'),
    ((SELECT product_id FROM products WHERE product_name = 'Foundation Star & Moon Skateboard'), 'nl', 'Foundation Star & Moon Skateboard is gebouwd voor een soepele en stabiele rit.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Primitive Rodriguez Samurai Skateboard'), 'en', 'Primitive Rodriguez Samurai Skateboard features stunning artwork and performance.'),
    ((SELECT product_id FROM products WHERE product_name = 'Primitive Rodriguez Samurai Skateboard'), 'nl', 'Primitive Rodriguez Samurai Skateboard heeft verbluffend artwork en prestaties.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Darkstar First Push Skateboard'), 'en', 'Darkstar First Push Skateboard, beginner-friendly and durable.'),
    ((SELECT product_id FROM products WHERE product_name = 'Darkstar First Push Skateboard'), 'nl', 'Darkstar First Push Skateboard, beginnersvriendelijk en duurzaam.'),
    
    ((SELECT product_id FROM products WHERE product_name = 'Jart Classic Complete Skateboard'), 'en', 'Jart Classic Complete Skateboard is reliable with a sleek design.'),
    ((SELECT product_id FROM products WHERE product_name = 'Jart Classic Complete Skateboard'), 'nl', 'Jart Classic Complete Skateboard is betrouwbaar met een strak design.');

-- Inserting product variations (size and stock quantity only)
INSERT INTO product_variations (product_id, size, stock_quantity) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), '8.0"', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), '8.25"', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), '7.75"', 15),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), '8.5"', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), '8.0"', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), '7.5"', 20),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), '8.125"', 7),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), '8.0"', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), '8.375"', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), '7.875"', 14),
    ((SELECT product_id FROM products WHERE product_name = 'Baker Brand Logo Skateboard'), '8.0"', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Chocolate Alvarez Hologram Skateboard'), '8.25"', 11),
    ((SELECT product_id FROM products WHERE product_name = 'Anti-Hero Classic Eagle Skateboard'), '8.5"', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Toy Machine Vice Dead Monster Skateboard'), '8.0"', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Creature Logo Complete Skateboard'), '7.75"', 13),
    ((SELECT product_id FROM products WHERE product_name = 'Real Classic Oval Complete Skateboard'), '8.0"', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Foundation Star & Moon Skateboard'), '8.25"', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Primitive Rodriguez Samurai Skateboard'), '8.5"', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Darkstar First Push Skateboard'), '7.875"', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Jart Classic Complete Skateboard'), '8.0"', 10),
    
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), '145mm', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), '147mm', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks'), '149mm', 15),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), '148mm', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks'), '146mm', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Ace AF1 Trucks'), '144mm', 20),
    ((SELECT product_id FROM products WHERE product_name = 'Royal Trucks Raw'), '150mm', 7),
    ((SELECT product_id FROM products WHERE product_name = 'Gullwing Mission Trucks'), '143mm', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Paris V3 Trucks'), '151mm', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Caliber II Fifty Trucks'), '152mm', 14),
    
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), '52mm', 25),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), '54mm', 30),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), '56mm', 20),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), '58mm', 18),
    ((SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels'), '60mm', 22),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels'), '62mm', 17),
    ((SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'), '64mm', 19),
    ((SELECT product_id FROM products WHERE product_name = 'Orangatang Kegel Wheels'), '66mm', 15),
    ((SELECT product_id FROM products WHERE product_name = 'Cloud Ride Cruiser Wheels'), '68mm', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Arbor Easyrider Bogart Wheels'), '70mm', 16);


-- Inserting product tags
INSERT INTO product_tags (product_id, tag_id) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 2);

-- Inserting product related products
INSERT INTO product_related_products (product_id, related_product_id) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'));

-- Inserting discounts for products
INSERT INTO discounts (product_id, discount_percentage, valid_from, valid_until) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 10.00, '2024-10-01', '2024-10-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 15.00, '2024-11-01', '2024-11-30'),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 5.00, '2024-12-01', '2024-12-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 20.00, '2024-10-15', '2024-10-25'),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 25.00, '2024-11-10', '2024-11-20');

-- Inserting reviews for products
INSERT INTO reviews (product_id, customer_name, rating, review_text, helpful_votes) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'Alice', 5, 'Great quality skateboard, very smooth ride!', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'Bob', 4, 'Nice skateboard, but a bit pricey.', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'Charlie', 5, 'Perfect for beginners, my son loves it!', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'Daisy', 3, 'Good board, but the grip tape wore out quickly.', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'Evan', 4, 'Solid build, great for tricks.', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'Fiona', 5, 'Love the design and quality!', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'George', 4, 'Good value for the price.', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'Hannah', 5, 'Excellent skateboard, highly recommend.', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'Ian', 3, 'Okay board, but could be better.', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'Jane', 5, 'Amazing skateboard, very durable!', 11);
