export type SearchParams = {
  query?: string;
  categoryId?: number;
  tagNames?: string[];
  sort?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
};
