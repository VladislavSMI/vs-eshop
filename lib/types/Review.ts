export type Review = {
  reviewId: number;
  productId: string;
  flagged: boolean;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewText: string;
  reviewDate: Date;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
