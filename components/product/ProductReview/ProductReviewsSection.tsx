import { getAllReviewsUseCase } from '@/use-cases/review';
import { ProductReview } from '@/lib/types';
import { ProductReviewList } from './ProductReviewList';

export default async function ProductReviewsSection() {
  const reviews: ProductReview[] = await getAllReviewsUseCase();

  if (!reviews?.length) {
    return <div className="text-center">No reviews available</div>;
  }

  return <ProductReviewList reviews={reviews} />;
}
