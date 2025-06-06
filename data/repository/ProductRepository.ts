import { executeQuery } from '@/lib/db';
import { log } from '@/lib/logging/log';
import { Product, ProductDetails } from '@/lib/types';
import { isMockEnabled } from '@/lib/utils/utils';
import { CONST } from '@/lib/const';
import { mockProducts } from '@/__test__/mocks/ProductRepositoryMocks';
import {
  buildProductQuery,
  buildProductSearchQuery,
} from '../queries/productQueryBuilder';
import { ProductRow, ProductRowDetails } from '../QueryResults';
import { ProductMappers } from '../mappers';

// The `isMockEnabled` check enables e2e testing in CI without direct database access, which is
// essential here due to calling this function directly from a server-side component.
// This approach supports testing in CI/CD where a test DB may not be available, while
// allowing a real DB connection in local development. Long-term, consider setting up
// a dedicated test database (e.g., in-memory DB for faster tests) or moving DB logic
// to a separate microservice to allow MSW to intercept API calls in tests.

export async function getAllProducts(): Promise<Product[]> {
  if (isMockEnabled()) {
    return mockProducts;
  }

  const query = `
    ${buildProductQuery()} 
    GROUP BY p.product_id, pc.category_name, pc.category_id, pi.mime_type 
    ORDER BY p.product_name;`;

  try {
    const data = await executeQuery<ProductRow>({
      query,
    });

    return data.rows.map(ProductMappers.base);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get all products.');
  }
}

export async function getProductSearchResultCount({
  searchTerm,
  categoryId,
  tagNames,
}: {
  searchTerm?: string;
  categoryId?: number;
  tagNames?: string[];
}): Promise<number> {
  let query = `
    SELECT COUNT(*) AS total_count
    FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.category_id
    LEFT JOIN product_descriptions pd ON p.product_id = pd.product_id
  `;

  const { conditions, values } = buildProductSearchQuery({
    searchTerm,
    categoryId,
    tagNames,
  });

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  try {
    const result = await executeQuery({
      query,
      values,
    });
    return Number(result.rows[0]?.total_count || 0);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get product result count.');
  }
}

export async function getProductSearch({
  searchTerm,
  categoryId,
  tagNames,
  orderBy = 'p.product_name',
  sort = 'ASC',
  offset = 0,
  limit = CONST.itemsPerPage,
}: {
  searchTerm?: string;
  categoryId?: number;
  tagNames?: string[];
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  offset?: number;
  limit?: number;
}): Promise<Product[]> {
  if (isMockEnabled()) {
    return mockProducts;
  }

  let query = `
  ${buildProductQuery()}
    LEFT JOIN product_descriptions pd ON p.product_id = pd.product_id
  `;

  const { conditions, values } = buildProductSearchQuery({
    searchTerm,
    categoryId,
    tagNames,
  });

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` 
    GROUP BY p.product_id, pc.category_name, pc.category_id, pi.mime_type
    ORDER BY ${orderBy} ${sort}
    LIMIT $${values.length + 1} OFFSET $${values.length + 2};
  `;
  values.push(limit, offset);

  try {
    const result = await executeQuery<ProductRow>({
      query,
      values,
    });

    return result.rows.map(ProductMappers.base);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get product search results.');
  }
}

export async function getProductById(
  productId: ProductDetails['productId'],
  locale: string = 'en',
): Promise<ProductDetails> {
  const query = `
    ${buildProductQuery({ isProductDetails: true })}
    WHERE p.product_id = $1
    GROUP BY p.product_id, pc.category_name, pc.category_id, pi.mime_type;
    `;

  try {
    const data = await executeQuery<ProductRowDetails>({
      query,
      values: [productId, locale],
    });

    return ProductMappers.withDetails(data.rows[0]);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get product details.');
  }
}
