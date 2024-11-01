import { executeQuery } from "@/lib/db";
import { log } from "@/lib/log";
import { Product } from "@/lib/types";

export async function getAllProducts() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log("Fetching revenue data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await executeQuery<Product>({
      query: `SELECT 
                p.product_id,
                p.product_name,
                p.category_id,
                pc.category_name,
                p.price,
                p.image_url,
                array_agg(t.tag_name) AS tags
              FROM products p
              LEFT JOIN product_categories pc ON p.category_id = pc.category_id
              LEFT JOIN product_tags pt ON p.product_id = pt.product_id
              LEFT JOIN tags t ON pt.tag_id = t.tag_id
              WHERE p.deleted_at IS NULL
              GROUP BY p.product_id, pc.category_name
              ORDER BY p.product_name
           `,
    });

    return data.rows;
  } catch (error) {
    log.error({ error }, "Database Error");
    throw new Error("Failed to get all products.");
  }
}