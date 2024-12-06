import { Category } from '@/lib/types';
import { CategoryRow } from '../QueryResults';

const mapCategory = (row: CategoryRow): Category => ({
  categoryId: row.category_id,
  categoryName: row.category_name,
});

export const CategoryMappers = {
  base: mapCategory,
};
