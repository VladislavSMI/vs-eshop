import { Tag } from './Shared';

export type SearchParams = {
  query?: string;
  categoryId?: number;
  tagNames?: Tag[];
  sort?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
};
