import { executeQuery } from '@/lib/db';
import { log } from '@/lib/logging/log';
import { Category } from '@/lib/types';
import { isMockEnabled } from '@/lib/utils/utils';
import { mockCategories } from '@/__test__/mocks/ProductRepositoryMocks';
import { CategoryRow } from '../QueryResults';
import { CategoryMappers } from '../mappers';

export async function getAllCategories(): Promise<Category[]> {
  if (isMockEnabled()) {
    return mockCategories;
  }

  try {
    const data = await executeQuery<CategoryRow>({
      query: `SELECT * FROM product_categories`,
    });

    return data.rows.map(CategoryMappers.base);
  } catch (error) {
    log.error({ error }, 'Database Error');
    throw new Error('Failed to get all categories.');
  }
}
