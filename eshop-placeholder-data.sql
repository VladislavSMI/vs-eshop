CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO product_categories (category_name) VALUES 
    ('Decks'), 
    ('Trucks'), 
    ('Wheels');

INSERT INTO sizes (size, category_id) VALUES 
    (7.875, 1), (8.000, 1), (8.125, 1), (8.250, 1), (8.375, 1), (8.500, 1), 
    (5.250, 2), (5.500, 2), (5.850, 2),
    (51.000, 3), (52.000, 3), (54.000, 3);

INSERT INTO tags (tag_name) VALUES 
    ('On Sale'), 
    ('New'), 
    ('Last in Inventory');

-- Insert 40 products (20 Decks, 10 Trucks, 10 Wheels)
INSERT INTO products (product_id, category_id, product_name, price)
VALUES
    -- 20 Decks
    ('ebbddc91-56a3-4f7a-b3bb-0777aa983f48', 1, 'Element Section Complete Skateboard', 120.00),
    ('203d199a-6566-4b61-b5fc-18b6a618b959', 1, 'Santa Cruz Classic Dot Skateboard', 130.00),
    ('09c8f070-463c-4f63-97a8-c6e7880c73dd', 1, 'Enjoi Whitey Panda Skateboard', 115.00),
    ('d0845ec0-c181-48d3-b83c-02f267691278', 1, 'Almost Mullen Uber Light Skateboard', 140.00),
    ('52e38caf-da7b-4366-bc7f-7ed761773b78', 1, 'Powell Peralta Ripper Skateboard', 135.00),
    ('86e28fbf-3afd-495e-a840-1b29bbbeaedf', 1, 'Globe G1 Argo Skateboard', 110.00),
    ('c829e330-2b6b-47b4-8d88-1ed71bb70a99', 1, 'Zero Single Skull Skateboard', 125.00),
    ('93a37655-e58c-4b85-89d8-fa8cc1c20f78', 1, 'Girl Carroll 93 Til Skateboard', 128.00),
    ('5a205531-0797-4b26-a4c5-bfb47578da35', 1, 'Plan B Team OG Skateboard', 145.00),
    ('a05c17cd-3f09-4a4f-badd-fe81df359a29', 1, 'Blind OG Logo Skateboard', 118.00),
    ('56228589-3705-46ef-ba50-b894b66cfeef', 1, 'Baker Brand Logo Skateboard', 125.00),
    ('1e3e7b7e-1411-4a6c-83ba-db3df005cea9', 1, 'Chocolate Alvarez Hologram Skateboard', 132.00),
    ('8781905c-7429-4cf2-88b3-449c991b98fe', 1, 'Anti-Hero Classic Eagle Skateboard', 127.00),
    ('543ae216-10c6-4b06-a9f5-980ee74f89fc', 1, 'Toy Machine Vice Dead Monster Skateboard', 122.00),
    ('6414389a-3359-4214-bdff-9754b8ae493c', 1, 'Creature Logo Complete Skateboard', 130.00),
    ('c0b91cf9-4c4a-45d1-b61a-f39d5d68052e', 1, 'Real Classic Oval Complete Skateboard', 138.00),
    ('52481d6b-1a17-46e6-ac86-948d0464869d', 1, 'Foundation Star & Moon Skateboard', 115.00),
    ('1a1a33cd-7d26-4c94-94e8-2645c500fa2e', 1, 'Primitive Rodriguez Samurai Skateboard', 150.00),
    ('1d7ffa47-5b99-4893-88c4-90a5f153a560', 1, 'Darkstar First Push Skateboard', 112.00),
    ('562b5b4c-cca3-49d1-86d4-c5c31efb6ff4', 1, 'Jart Classic Complete Skateboard', 119.00),

    -- 10 Trucks
    ('197d5f94-d048-4ae1-ada3-c150b1efe559', 2, 'Independent Stage 11 Standard Trucks', 60.00),
    ('cff0a68b-3258-41b6-9d41-6a7d56895f89', 2, 'Thunder Polished Team Trucks', 58.00),
    ('9e0f8cd3-e5c2-4b5a-a5c0-f1c4604c2176', 2, 'Venture Polished Low Trucks', 55.00),
    ('eac588cf-68d9-43e7-b96f-68e72fe98d5a', 2, 'Tensor Mag Light Trucks', 65.00),
    ('82703ec1-6bb9-46d8-9f38-2279321e6a7e', 2, 'Krux K5 Galaxy Trucks', 62.00),
    ('8ebefd7f-96c5-4ff6-94ef-af2dd5a4cccd', 2, 'Ace AF1 Trucks', 64.00),
    ('146d2632-4299-4b2b-94f0-3f3e9bc24ca5', 2, 'Royal Trucks Raw', 57.00),
    ('c8619676-8aa4-417a-b1bf-273c109fdd59', 2, 'Gullwing Mission Trucks', 59.00),
    ('0d35d983-39b8-4997-9105-6a95fda0e3e1', 2, 'Paris V3 Trucks', 66.00),
    ('0c5fa1da-c3d4-4dde-956d-96458471563f', 2, 'Caliber II Fifty Trucks', 63.00),

    -- 10 Wheels
    ('8dec4e6f-dab7-4b02-b587-efc7bb539e83', 3, 'Spitfire Formula Four Wheels', 40.00),
    ('7dcdd53e-4293-4a39-868c-c9908aab8aa4', 3, 'Bones STF V1 Wheels', 45.00),
    ('db953f4a-5802-47aa-a2fd-bc946dca1d68', 3, 'Ricta Clouds Cruiser Wheels', 42.00),
    ('6ecd1355-0c83-42f1-8bd1-5bf4b4938145', 3, 'OJ Super Juice Wheels', 38.00),
    ('b23ce9c1-4ece-4e7c-9e01-870fc1c1a9ad', 3, 'Sector 9 Nineballs Wheels', 43.00),
    ('e29c9d2b-2043-48f7-aeb6-158fbfadf332', 3, 'Powell Peralta G-Slides Wheels', 44.00),
    ('2b57219a-3973-4ebe-94dd-61f0e904a814', 3, 'Slime Balls OG Wheels', 39.00),
    ('48840a79-8f2b-494a-893f-415a60daf4a5', 3, 'Orangatang Kegel Wheels', 50.00),
    ('02d7a152-92cc-461d-a724-927a8b9f4dbe', 3, 'Cloud Ride Cruiser Wheels', 41.00),
    ('d603b1b4-0ff4-40e4-970f-0618f7902e94', 3, 'Arbor Easyrider Bogart Wheels', 46.00);

-- Insert product images
INSERT INTO product_images (id, product_id, mime_type)
VALUES
    ('05aee806-2831-40f5-b925-bba4989b7258', 'c8619676-8aa4-417a-b1bf-273c109fdd59', 'image/webp'),
    ('0fd1b8c6-a65e-47d9-acd9-1b06d846a669', '0d35d983-39b8-4997-9105-6a95fda0e3e1', 'image/webp'),
    ('19fdafb2-0991-4f3a-bf50-e2af21aa11b0', '203d199a-6566-4b61-b5fc-18b6a618b959', 'image/webp'),
    ('1a410530-59f0-411e-89c4-28a4e2d09363', '1a1a33cd-7d26-4c94-94e8-2645c500fa2e', 'image/webp'),
    ('1ff36746-697e-4dcb-aae4-4f201a588224', '82703ec1-6bb9-46d8-9f38-2279321e6a7e', 'image/webp'),
    ('2055b851-525e-4a52-8679-1ea748568a34', '6ecd1355-0c83-42f1-8bd1-5bf4b4938145', 'image/webp'),
    ('22f0d2f6-636b-4a8d-a74d-ef32925e5aa0', '09c8f070-463c-4f63-97a8-c6e7880c73dd', 'image/webp'),
    ('2f6f00a5-72f2-4f9d-a20d-b85dadb87085', 'eac588cf-68d9-43e7-b96f-68e72fe98d5a', 'image/webp'),
    ('31ea93da-9a43-4168-8238-596c8588e2e6', '48840a79-8f2b-494a-893f-415a60daf4a5', 'image/webp'),
    ('3dc9210c-86b6-4edd-be3d-df3776ad91b9', '0c5fa1da-c3d4-4dde-956d-96458471563f', 'image/webp'),
    ('4072bf6f-686e-423f-a185-0643c7d83f07', '146d2632-4299-4b2b-94f0-3f3e9bc24ca5', 'image/webp'),
    ('4e49ed0b-4c64-47c4-9e64-b848a2b27c89', '1e3e7b7e-1411-4a6c-83ba-db3df005cea9', 'image/webp'),
    ('534748d1-f753-4f74-8eb8-2a92101466f3', '52e38caf-da7b-4366-bc7f-7ed761773b78', 'image/webp'),
    ('605a5f0b-b5b4-4030-9501-ca258ed55c7f', '56228589-3705-46ef-ba50-b894b66cfeef', 'image/webp'),
    ('67279009-7269-44ce-87dc-115da974e510', '7dcdd53e-4293-4a39-868c-c9908aab8aa4', 'image/webp'),
    ('6ac7d5ac-e196-4ad8-b805-9bf37ec3aef8', '197d5f94-d048-4ae1-ada3-c150b1efe559', 'image/webp'),
    ('6f378333-9860-4e45-ab35-2b31c9f399ea', '86e28fbf-3afd-495e-a840-1b29bbbeaedf', 'image/webp'),
    ('6fa5c4c9-1d46-420d-b49b-ff3a9b5a01c1', 'ebbddc91-56a3-4f7a-b3bb-0777aa983f48', 'image/webp'),
    ('7239a479-a47e-4b20-ab9d-8816f2bacded', '6414389a-3359-4214-bdff-9754b8ae493c', 'image/webp'),
    ('7b23b154-98f6-4fb5-9c00-3c813d7f5d89', 'cff0a68b-3258-41b6-9d41-6a7d56895f89', 'image/webp'),
    ('902b2aeb-52f4-42ab-b4bd-2b9e48f9890a', '8ebefd7f-96c5-4ff6-94ef-af2dd5a4cccd', 'image/webp'),
    ('93f486d4-8e2c-4e70-9e8b-06bc53b5e944', '8781905c-7429-4cf2-88b3-449c991b98fe', 'image/webp'),
    ('94ed34bc-1603-4c03-973f-ae4a1c5f42d2', '93a37655-e58c-4b85-89d8-fa8cc1c20f78', 'image/webp'),
    ('967a8a02-61ae-4652-8d3a-1364757515a4', '8dec4e6f-dab7-4b02-b587-efc7bb539e83', 'image/webp'),
    ('971032d2-d9cd-4ee7-89f3-055f53f28a64', '52481d6b-1a17-46e6-ac86-948d0464869d', 'image/webp'),
    ('a251b7fe-a6cb-4474-ae3c-5c5af7fc2c98', 'c0b91cf9-4c4a-45d1-b61a-f39d5d68052e', 'image/webp'),
    ('a9b531e3-ceaa-40b8-b663-972c9e02be4e', 'b23ce9c1-4ece-4e7c-9e01-870fc1c1a9ad', 'image/webp'),
    ('b22889aa-05a3-48d2-bbcf-bbdca2dd3f92', '562b5b4c-cca3-49d1-86d4-c5c31efb6ff4', 'image/webp'),
    ('b384d6fd-f4e0-41f3-b625-f0415319e6f8', 'd0845ec0-c181-48d3-b83c-02f267691278', 'image/webp'),
    ('ba4aa656-7e83-4448-8631-de916dc02598', 'db953f4a-5802-47aa-a2fd-bc946dca1d68', 'image/webp'),
    ('ba6f3de8-c91d-44aa-ac30-54641eefff3d', 'e29c9d2b-2043-48f7-aeb6-158fbfadf332', 'image/webp'),
    ('bbfd33ef-ccd0-4e66-a41d-fa18593265ed', '02d7a152-92cc-461d-a724-927a8b9f4dbe', 'image/webp'),
    ('c0d29484-6bf4-42f2-9cad-c7b197c53e64', 'd603b1b4-0ff4-40e4-970f-0618f7902e94', 'image/webp'),
    ('d455c221-18cc-478a-b115-bb0720e47f12', '543ae216-10c6-4b06-a9f5-980ee74f89fc', 'image/webp'),
    ('f061ac92-6aad-4c81-8c73-a09840b0eb99', 'a05c17cd-3f09-4a4f-badd-fe81df359a29', 'image/webp'),
    ('f2484367-3744-407a-b6d1-4f99d0525c9c', '9e0f8cd3-e5c2-4b5a-a5c0-f1c4604c2176', 'image/webp'),
    ('f32c7bf7-e239-454b-8aa8-294bd497459b', '2b57219a-3973-4ebe-94dd-61f0e904a814', 'image/webp'),
    ('f758b962-fb0f-4a06-aba0-57ccd39b8a38', '5a205531-0797-4b26-a4c5-bfb47578da35', 'image/webp'),
    ('f93ef6be-1a6d-43d1-a7d3-09064d72d41c', 'c829e330-2b6b-47b4-8d88-1ed71bb70a99', 'image/webp'),
    ('fb390d87-020c-4c2b-b42b-d99e83ffbc32', '1d7ffa47-5b99-4893-88c4-90a5f153a560', 'image/webp');


-- Update products with main image ID
UPDATE products p
SET main_image_id = (
    SELECT pi.id 
    FROM product_images pi 
    WHERE pi.product_id = p.product_id
)
WHERE EXISTS (
    SELECT 1 
    FROM product_images pi 
    WHERE pi.product_id = p.product_id
);



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

INSERT INTO countries (code, name) VALUES
    ('AT', 'Austria'),
    ('BE', 'Belgium'),
    ('BG', 'Bulgaria'),
    ('HR', 'Croatia'),
    ('CY', 'Cyprus'),
    ('CZ', 'Czechia'),
    ('DK', 'Denmark'),
    ('EE', 'Estonia'),
    ('FI', 'Finland'),
    ('FR', 'France'),
    ('DE', 'Germany'),
    ('GR', 'Greece'),
    ('HU', 'Hungary'),
    ('IE', 'Ireland'),
    ('IT', 'Italy'),
    ('LV', 'Latvia'),
    ('LT', 'Lithuania'),
    ('LU', 'Luxembourg'),
    ('MT', 'Malta'),
    ('NL', 'Netherlands'),
    ('PL', 'Poland'),
    ('PT', 'Portugal'),
    ('RO', 'Romania'),
    ('SK', 'Slovakia'),
    ('SI', 'Slovenia'),
    ('ES', 'Spain'),
    ('SE', 'Sweden');
