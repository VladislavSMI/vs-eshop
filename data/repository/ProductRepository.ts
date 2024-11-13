import { executeQuery } from '@/lib/db';
import { log } from '@/lib/log';
import { Category, Product } from '@/lib/types';
import { ProductRow, CategoryRow } from '../dbTypes';
import { isMockEnabled, isValidTag } from '@/lib/utils';
import {
  mockCategories,
  mockProducts,
} from '@/__test__/mocks/ProductRepositoryMocks';

const mapProduct = (row: ProductRow): Product => ({
  productId: row.product_id,
  productName: row.product_name,
  categoryId: row.category_id,
  categoryName: row.category_name,
  price: parseFloat(row.price),
  imageUrl: row.image_url,
  tags: row.tags.filter(isValidTag),
});

const mapCategory = (row: CategoryRow): Category => ({
  categoryId: row.category_id,
  categoryName: row.category_name,
});

// The `isMockEnabled` check enables testing without direct database access, which is
// essential here due to calling this function directly from a server-side component.
// This approach supports testing in CI/CD where a test DB may not be available, while
// allowing a real DB connection in local development. Long-term, consider setting up
// a dedicated test database (e.g., in-memory DB for faster tests) or moving DB logic
// to a separate microservice to allow MSW to intercept API calls in tests.

export async function getAllProducts(): Promise<Product[]> {
  if (isMockEnabled()) {
    return mockProducts;
  }

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log("Fetching revenue data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await executeQuery<ProductRow>({
      query: `SELECT 
                p.product_id,
                p.product_name,
                p.category_id,
                pc.category_name,
                p.price,
                p.image_url,
                COALESCE(array_remove(array_agg(t.tag_name), NULL), '{}') AS tags
              FROM products p
              LEFT JOIN product_categories pc ON p.category_id = pc.category_id
              LEFT JOIN product_tags pt ON p.product_id = pt.product_id
              LEFT JOIN tags t ON pt.tag_id = t.tag_id
              WHERE p.deleted_at IS NULL
              GROUP BY p.product_id, pc.category_name
              ORDER BY p.product_name
           `,
    });

    // ToDo: Create DTO for admin and normal users, don't just return rows.
    return data.rows.map(mapProduct);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get all products.');
  }
}

export async function getAllCategories(): Promise<Category[]> {
  if (isMockEnabled()) {
    return mockCategories;
  }

  try {
    const data = await executeQuery<CategoryRow>({
      query: `SELECT * FROM product_categories`,
    });

    return data.rows.map(mapCategory);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get all categories.');
  }
}
