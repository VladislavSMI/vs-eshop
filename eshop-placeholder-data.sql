CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert categories
INSERT INTO product_categories (category_name) VALUES 
    ('Decks'), 
    ('Trucks'), 
    ('Wheels');

-- Insert sizes for each category
INSERT INTO sizes (size, category_id) VALUES 
    (7.875, 1), (8.000, 1), (8.125, 1), (8.250, 1), (8.375, 1), (8.500, 1), 
    (5.250, 2), (5.500, 2), (5.850, 2),
    (51.000, 3), (52.000, 3), (54.000, 3);

-- Insert common tags
INSERT INTO tags (tag_name) VALUES 
    ('On Sale'), 
    ('New'), 
    ('Last in Inventory');

-- Insert products
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

-- Inserting product variations (size and stock quantity)
INSERT INTO product_variations (product_id, size_id, stock_quantity) VALUES
    -- Decks (Category 1)
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.000 AND category_id = 1), 10),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.250 AND category_id = 1), 8),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), (SELECT size_id FROM sizes WHERE size = 7.875 AND category_id = 1), 5),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.500 AND category_id = 1), 12),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.000 AND category_id = 1), 7),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.375 AND category_id = 1), 6),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.125 AND category_id = 1), 9),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.000 AND category_id = 1), 15),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), (SELECT size_id FROM sizes WHERE size = 8.250 AND category_id = 1), 5),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), (SELECT size_id FROM sizes WHERE size = 7.875 AND category_id = 1), 10),

    -- Trucks (Category 2)
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), (SELECT size_id FROM sizes WHERE size = 5.250 AND category_id = 2), 20),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), (SELECT size_id FROM sizes WHERE size = 5.500 AND category_id = 2), 12),
    ((SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks'), (SELECT size_id FROM sizes WHERE size = 5.850 AND category_id = 2), 18),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), (SELECT size_id FROM sizes WHERE size = 5.250 AND category_id = 2), 10),
    ((SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks'), (SELECT size_id FROM sizes WHERE size = 5.500 AND category_id = 2), 15),
    ((SELECT product_id FROM products WHERE product_name = 'Ace AF1 Trucks'), (SELECT size_id FROM sizes WHERE size = 5.850 AND category_id = 2), 9),
    ((SELECT product_id FROM products WHERE product_name = 'Royal Trucks Raw'), (SELECT size_id FROM sizes WHERE size = 5.250 AND category_id = 2), 14),
    ((SELECT product_id FROM products WHERE product_name = 'Gullwing Mission Trucks'), (SELECT size_id FROM sizes WHERE size = 5.500 AND category_id = 2), 10),
    ((SELECT product_id FROM products WHERE product_name = 'Paris V3 Trucks'), (SELECT size_id FROM sizes WHERE size = 5.850 AND category_id = 2), 12),
    ((SELECT product_id FROM products WHERE product_name = 'Caliber II Fifty Trucks'), (SELECT size_id FROM sizes WHERE size = 5.250 AND category_id = 2), 8),

    -- Wheels (Category 3)
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), (SELECT size_id FROM sizes WHERE size = 52.000 AND category_id = 3), 25),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), (SELECT size_id FROM sizes WHERE size = 54.000 AND category_id = 3), 30),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), (SELECT size_id FROM sizes WHERE size = 51.000 AND category_id = 3), 15),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), (SELECT size_id FROM sizes WHERE size = 54.000 AND category_id = 3), 20),
    ((SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels'), (SELECT size_id FROM sizes WHERE size = 52.000 AND category_id = 3), 22),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels'), (SELECT size_id FROM sizes WHERE size = 54.000 AND category_id = 3), 18),
    ((SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'), (SELECT size_id FROM sizes WHERE size = 51.000 AND category_id = 3), 12),
    ((SELECT product_id FROM products WHERE product_name = 'Orangatang Kegel Wheels'), (SELECT size_id FROM sizes WHERE size = 52.000 AND category_id = 3), 25),
    ((SELECT product_id FROM products WHERE product_name = 'Cloud Ride Cruiser Wheels'), (SELECT size_id FROM sizes WHERE size = 54.000 AND category_id = 3), 30),
    ((SELECT product_id FROM products WHERE product_name = 'Arbor Easyrider Bogart Wheels'), (SELECT size_id FROM sizes WHERE size = 51.000 AND category_id = 3), 18);

-- Inserting product descriptions (in English and Dutch)
INSERT INTO product_descriptions (product_id, language_code, description) VALUES
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'en', 'The Element Section Complete Skateboard is a versatile board designed for riders of all skill levels. Its durable build and sleek design make it a great choice for daily skating.'),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'nl', 'De Element Section Complete Skateboard is een veelzijdig board ontworpen voor rijders van elk niveau. Duurzaam en stijlvol, perfect voor dagelijks gebruik en lange ritten.'),

    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'en', 'Santa Cruz Classic Dot Skateboard combines timeless style with high durability. Perfect for skaters who value performance and iconic graphics, this board is ideal for street and park skating.'),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'nl', 'Santa Cruz Classic Dot Skateboard combineert tijdloze stijl met hoge duurzaamheid. Ideaal voor skaters die waarde hechten aan prestaties en iconische graphics.'),

    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'en', 'The Enjoi Whitey Panda Skateboard stands out for its vibrant graphics and excellent build quality. This board is a perfect option for skaters looking to make a bold statement.'),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'nl', 'De Enjoi Whitey Panda Skateboard valt op door zijn levendige graphics en uitstekende kwaliteit. Een geweldige keuze voor skaters die een gedurfde indruk willen maken.'),

    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'en', 'The Almost Mullen Uber Light Skateboard is ultra-lightweight and perfect for mastering tricks. Its advanced design makes it a favorite for both professionals and serious enthusiasts.'),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'nl', 'De Almost Mullen Uber Light Skateboard is ultralicht en perfect voor het oefenen van trucs. Geweldig voor zowel professionals als serieuze skaters.'),

    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'en', 'Powell Peralta Ripper Skateboard reintroduces the iconic design with modern performance. Known for its smooth ride, this board is a must-have for collectors and active skaters.'),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'nl', 'Powell Peralta Ripper Skateboard combineert een iconisch ontwerp met moderne prestaties. Perfect voor verzamelaars en actieve skaters.'),

    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'en', 'The Globe G1 Argo Skateboard offers a sturdy and reliable build, making it suitable for everyday skating. Its vibrant design adds a stylish touch to your skating routine.'),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'nl', 'De Globe G1 Argo Skateboard is stevig en betrouwbaar, ideaal voor dagelijks gebruik. Het levendige ontwerp maakt het een stijlvolle keuze.'),

    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'en', 'The Zero Single Skull Skateboard features a bold graphic and premium construction. Designed for intense rides, this board is great for street, park, and ramp skating adventures.'),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'nl', 'De Zero Single Skull Skateboard biedt een gedurfd ontwerp en hoogwaardige constructie. Ideaal voor intensieve ritten op straat, in het park of op ramps.'),

    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'en', 'Girl Carroll 93 Til Skateboard combines classic graphics with a durable design. It provides a smooth ride, making it a top choice for beginners and experienced skaters alike.'),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'nl', 'De Girl Carroll 93 Til Skateboard biedt klassieke graphics en een duurzaam ontwerp. Perfect voor een soepele rit, ideaal voor beginners en gevorderden.'),

    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'en', 'The Plan B Team OG Skateboard is known for its exceptional build quality and sleek design. It is a favorite among street and park skaters who value reliability.'),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'nl', 'De Plan B Team OG Skateboard staat bekend om zijn uitzonderlijke kwaliteit en strakke ontwerp. Een favoriet onder straat- en park skaters.'),

    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'en', 'Blind OG Logo Skateboard combines legendary graphics with a sturdy construction. It is a perfect skateboard for skaters who value tradition and modern performance.'),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'nl', 'De Blind OG Logo Skateboard combineert iconische graphics met een stevige constructie. Ideaal voor skaters die traditie en moderne prestaties waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Baker Brand Logo Skateboard'), 'en', 'The Baker Brand Logo Skateboard features iconic branding and a reliable build. Designed for performance, it is a favorite among skaters who value quality and design.'),
    ((SELECT product_id FROM products WHERE product_name = 'Baker Brand Logo Skateboard'), 'nl', 'De Baker Brand Logo Skateboard biedt iconisch merk en betrouwbare constructie. Ideaal voor skaters die kwaliteit en design waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Chocolate Alvarez Hologram Skateboard'), 'en', 'Chocolate Alvarez Hologram Skateboard offers unique graphics and excellent durability. A great option for skaters who value individuality and high performance.'),
    ((SELECT product_id FROM products WHERE product_name = 'Chocolate Alvarez Hologram Skateboard'), 'nl', 'De Chocolate Alvarez Hologram Skateboard biedt unieke graphics en uitstekende duurzaamheid. Perfect voor skaters die individualiteit waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Anti-Hero Classic Eagle Skateboard'), 'en', 'Anti-Hero Classic Eagle Skateboard is built for rugged performance on all terrains. With a timeless design, it’s an essential board for every skater’s collection.'),
    ((SELECT product_id FROM products WHERE product_name = 'Anti-Hero Classic Eagle Skateboard'), 'nl', 'De Anti-Hero Classic Eagle Skateboard is gebouwd voor alle terreinen. Een tijdloos ontwerp, perfect voor elke skater.'),

    ((SELECT product_id FROM products WHERE product_name = 'Toy Machine Vice Dead Monster Skateboard'), 'en', 'The Toy Machine Vice Dead Monster Skateboard stands out with its bold and colorful artwork. It’s a durable and high-performance option for skaters who love unique designs.'),
    ((SELECT product_id FROM products WHERE product_name = 'Toy Machine Vice Dead Monster Skateboard'), 'nl', 'De Toy Machine Vice Dead Monster Skateboard valt op door zijn opvallende kleurrijke artwork. Duurzaam en ideaal voor skaters die unieke ontwerpen waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Creature Logo Complete Skateboard'), 'en', 'Creature Logo Complete Skateboard is an all-around board for skaters of all skill levels. Its solid build and iconic graphics make it a reliable and stylish choice.'),
    ((SELECT product_id FROM products WHERE product_name = 'Creature Logo Complete Skateboard'), 'nl', 'De Creature Logo Complete Skateboard is een allround board voor alle niveaus. Betrouwbaar en stijlvol met iconische graphics.'),

    ((SELECT product_id FROM products WHERE product_name = 'Real Classic Oval Complete Skateboard'), 'en', 'The Real Classic Oval Complete Skateboard provides a solid ride with a classic look. Designed for skaters who appreciate timeless style and exceptional build quality.'),
    ((SELECT product_id FROM products WHERE product_name = 'Real Classic Oval Complete Skateboard'), 'nl', 'De Real Classic Oval Complete Skateboard biedt een solide rit met een klassieke uitstraling. Perfect voor skaters die tijdloze stijl waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Foundation Star & Moon Skateboard'), 'en', 'Foundation Star & Moon Skateboard delivers a smooth and steady ride. Its creative design and durable build make it a must-have for skaters of all levels.'),
    ((SELECT product_id FROM products WHERE product_name = 'Foundation Star & Moon Skateboard'), 'nl', 'De Foundation Star & Moon Skateboard biedt een soepele en stabiele rit. Creatief ontwerp en duurzaam gebouwd voor skaters van elk niveau.'),

    ((SELECT product_id FROM products WHERE product_name = 'Primitive Rodriguez Samurai Skateboard'), 'en', 'Primitive Rodriguez Samurai Skateboard combines stunning artwork with high performance. This board is perfect for skaters who appreciate style and durability.'),
    ((SELECT product_id FROM products WHERE product_name = 'Primitive Rodriguez Samurai Skateboard'), 'nl', 'De Primitive Rodriguez Samurai Skateboard combineert verbluffend artwork met hoge prestaties. Ideaal voor skaters die stijl en duurzaamheid waarderen.'),

    ((SELECT product_id FROM products WHERE product_name = 'Darkstar First Push Skateboard'), 'en', 'Darkstar First Push Skateboard is beginner-friendly with excellent durability. Its vibrant design and steady performance make it a great entry-level board.'),
    ((SELECT product_id FROM products WHERE product_name = 'Darkstar First Push Skateboard'), 'nl', 'De Darkstar First Push Skateboard is beginnersvriendelijk en duurzaam. Een levendig ontwerp en stabiele prestaties maken het perfect voor beginners.'),

    ((SELECT product_id FROM products WHERE product_name = 'Jart Classic Complete Skateboard'), 'en', 'Jart Classic Complete Skateboard is reliable and sleek, making it an excellent choice for riders seeking a combination of style and practicality in a skateboard.'),
    ((SELECT product_id FROM products WHERE product_name = 'Jart Classic Complete Skateboard'), 'nl', 'De Jart Classic Complete Skateboard is betrouwbaar en stijlvol. Ideaal voor skaters die stijl en functionaliteit willen combineren.');

-- Insert product tags
INSERT INTO product_tags (product_id, tag_id) VALUES
    -- Decks
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 1),

    -- Trucks
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Ace AF1 Trucks'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Royal Trucks Raw'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Gullwing Mission Trucks'), 2),

    -- Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels'), 2),
    ((SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Orangatang Kegel Wheels'), 3),
    ((SELECT product_id FROM products WHERE product_name = 'Cloud Ride Cruiser Wheels'), 1),
    ((SELECT product_id FROM products WHERE product_name = 'Arbor Easyrider Bogart Wheels'), 2);


-- Insert related products
INSERT INTO product_related_products (product_id, related_product_id) VALUES
    -- Element Section Complete Skateboard
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard')),

    -- Santa Cruz Classic Dot Skateboard
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard')),

    -- Enjoi Whitey Panda Skateboard
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard')),

    -- Almost Mullen Uber Light Skateboard
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard')),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), (SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard')),

    -- Independent Stage 11 Standard Trucks
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), (SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks')),
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), (SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks')),

    -- Thunder Polished Team Trucks
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), (SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks')),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), (SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks')),

    -- Spitfire Formula Four Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), (SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels')),
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), (SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels')),

    -- Bones STF V1 Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), (SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels')),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), (SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels')),

    -- Ricta Clouds Cruiser Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), (SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels')),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), (SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'));


-- Insert discounts for products
INSERT INTO discounts (product_id, discount_percentage, valid_from, valid_until) VALUES
    -- Decks
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 10.00, '2024-10-01', '2024-10-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 15.00, '2024-11-01', '2024-11-30'),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 5.00, '2024-12-01', '2024-12-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 20.00, '2024-10-15', '2024-10-25'),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 25.00, '2024-11-10', '2024-11-20'),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 8.00, '2024-11-05', '2024-11-15'),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 12.00, '2024-12-01', '2024-12-10'),

    -- Trucks
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), 10.00, '2024-11-01', '2024-11-20'),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), 15.00, '2024-11-15', '2024-12-01'),
    ((SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks'), 5.00, '2024-10-20', '2024-10-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), 18.00, '2024-12-01', '2024-12-10'),
    ((SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks'), 22.00, '2024-11-05', '2024-11-15'),
    ((SELECT product_id FROM products WHERE product_name = 'Ace AF1 Trucks'), 7.50, '2024-12-10', '2024-12-20'),

    -- Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), 12.00, '2024-10-01', '2024-10-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), 15.00, '2024-11-01', '2024-11-30'),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), 20.00, '2024-12-01', '2024-12-31'),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), 10.00, '2024-11-10', '2024-11-20'),
    ((SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels'), 5.00, '2024-11-05', '2024-11-15'),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels'), 18.00, '2024-10-20', '2024-10-31'),
    ((SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'), 22.50, '2024-12-01', '2024-12-10'),
    ((SELECT product_id FROM products WHERE product_name = 'Orangatang Kegel Wheels'), 25.00, '2024-11-15', '2024-12-01'),
    ((SELECT product_id FROM products WHERE product_name = 'Cloud Ride Cruiser Wheels'), 10.00, '2024-12-10', '2024-12-20'),
    ((SELECT product_id FROM products WHERE product_name = 'Arbor Easyrider Bogart Wheels'), 15.00, '2024-11-20', '2024-11-30');

-- Insert reviews
INSERT INTO reviews (product_id, customer_name, rating, review_text, helpful_votes) VALUES
    -- Decks
    ((SELECT product_id FROM products WHERE product_name = 'Element Section Complete Skateboard'), 'Alice', 5, 'Great quality skateboard, very smooth ride!', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Santa Cruz Classic Dot Skateboard'), 'Bob', 4, 'Nice skateboard, but a bit pricey.', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Enjoi Whitey Panda Skateboard'), 'Charlie', 5, 'Perfect for beginners, my son loves it!', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Almost Mullen Uber Light Skateboard'), 'Daisy', 3, 'Good board, but the grip tape wore out quickly.', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta Ripper Skateboard'), 'Evan', 4, 'Solid build, great for tricks.', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Globe G1 Argo Skateboard'), 'Fiona', 5, 'Love the design and quality!', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Zero Single Skull Skateboard'), 'George', 4, 'Good value for the price.', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Girl Carroll 93 Til Skateboard'), 'Hannah', 5, 'Excellent skateboard, highly recommend.', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Plan B Team OG Skateboard'), 'Ian', 3, 'Okay board, but could be better.', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Blind OG Logo Skateboard'), 'Jane', 5, 'Amazing skateboard, very durable!', 11),

    -- Trucks
    ((SELECT product_id FROM products WHERE product_name = 'Independent Stage 11 Standard Trucks'), 'Kyle', 5, 'The trucks are strong and smooth.', 7),
    ((SELECT product_id FROM products WHERE product_name = 'Thunder Polished Team Trucks'), 'Laura', 4, 'Good quality, though a bit heavy.', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Venture Polished Low Trucks'), 'Mike', 4, 'Great for street skating, solid build.', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Tensor Mag Light Trucks'), 'Nina', 5, 'Extremely light and responsive.', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Krux K5 Galaxy Trucks'), 'Oscar', 4, 'Stylish and reliable, but could turn better.', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Ace AF1 Trucks'), 'Paula', 5, 'Exceptional quality, these last forever.', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Royal Trucks Raw'), 'Quinn', 3, 'Decent trucks for the price.', 3),

    -- Wheels
    ((SELECT product_id FROM products WHERE product_name = 'Spitfire Formula Four Wheels'), 'Rachel', 5, 'Super fast and durable wheels.', 15),
    ((SELECT product_id FROM products WHERE product_name = 'Bones STF V1 Wheels'), 'Steve', 5, 'Great grip and control, love them!', 10),
    ((SELECT product_id FROM products WHERE product_name = 'Ricta Clouds Cruiser Wheels'), 'Tom', 4, 'Good cruiser wheels, very smooth.', 7),
    ((SELECT product_id FROM products WHERE product_name = 'OJ Super Juice Wheels'), 'Ursula', 5, 'Perfect for rough terrain, very reliable.', 14),
    ((SELECT product_id FROM products WHERE product_name = 'Sector 9 Nineballs Wheels'), 'Victor', 4, 'Nice wheels, but wear down quickly.', 5),
    ((SELECT product_id FROM products WHERE product_name = 'Powell Peralta G-Slides Wheels'), 'Wendy', 5, 'Great all-around wheels for skating.', 8),
    ((SELECT product_id FROM products WHERE product_name = 'Slime Balls OG Wheels'), 'Xander', 4, 'Fun design, good for cruising.', 6),
    ((SELECT product_id FROM products WHERE product_name = 'Orangatang Kegel Wheels'), 'Yara', 5, 'Top-notch wheels, handle great at high speeds.', 12),
    ((SELECT product_id FROM products WHERE product_name = 'Cloud Ride Cruiser Wheels'), 'Zach', 5, 'Smooth ride and great durability.', 9),
    ((SELECT product_id FROM products WHERE product_name = 'Arbor Easyrider Bogart Wheels'), 'Amy', 4, 'Good wheels for the price.', 7);
