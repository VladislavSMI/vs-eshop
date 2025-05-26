import { getAllReviews } from '@/data/repository/ReviewRepository';
import { ProductReview } from '@/lib/types';

export async function getAllReviewsUseCase(
  limit: number = 8,
): Promise<ProductReview[]> {
  return getAllReviews(limit);
}
