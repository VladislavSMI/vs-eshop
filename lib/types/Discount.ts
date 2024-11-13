export type Discount = {
  discountId: number;
  productId: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
