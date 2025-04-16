/*
   ********************************************************************
   *  DEV-ONLY DROP SCRIPT for VS Skate-Shop Schema                    *
   *  ---------------------------------------------------------------- *
   *  This script is intended solely for use in a development or test  *
   *  environment. It will DROP TABLES, EXTENSIONS, AND FUNCTIONS,     *
   *  destroying all existing data.                                    *
   *                                                                  *
   *  DO NOT RUN THIS IN PRODUCTION.                                   *
   ********************************************************************
*/

BEGIN;

-- 1) To actually drop everything, uncomment the lines below.
-- 2) Confirm you are in a DEV/TEST environment.
-- 3) Replace ROLLBACK with COMMIT at the end if you truly want to persist the drops.

-- DROP TABLE IF EXISTS product_categories CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS product_images CASCADE;
-- DROP TABLE IF EXISTS product_variations CASCADE;
-- DROP TABLE IF EXISTS product_descriptions CASCADE;
-- DROP TABLE IF EXISTS sizes CASCADE;
-- DROP TABLE IF EXISTS tags CASCADE;
-- DROP TABLE IF EXISTS product_tags CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS product_related_products CASCADE;
-- DROP TABLE IF EXISTS discounts CASCADE;
-- DROP TABLE IF EXISTS carts CASCADE;
-- DROP TABLE IF EXISTS cart_items CASCADE;
-- DROP TABLE IF EXISTS countries CASCADE;
-- DROP TABLE IF EXISTS shipping_addresses CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS payments CASCADE;
-- DROP TABLE IF EXISTS payment_logs CASCADE;
-- DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
-- DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- By default, we ROLLBACK to prevent accidental destruction:
ROLLBACK;

-- If you are absolutely sure you want these changes to take effect, 
-- replace the above ROLLBACK with:
-- COMMIT;
