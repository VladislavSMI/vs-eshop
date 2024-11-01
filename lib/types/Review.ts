export type Review = {
  review_id: number;
  product_id: string;
  flagged: boolean;
  customer_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review_text: string;
  review_date: Date;
  helpful_votes: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
};