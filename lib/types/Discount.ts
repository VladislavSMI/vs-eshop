export type Discount = {
  discount_id: number;
  product_id: string;
  discount_percentage: number;
  valid_from: Date;
  valid_until: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
};