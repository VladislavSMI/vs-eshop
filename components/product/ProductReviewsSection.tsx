import { getAllReviewsUseCase } from '@/use-cases/review';
import { ProductReviewCard } from '@/components/product/ProductReviewCard';
import { ProductReview } from '@/lib/types';

export default async function ProductReviewsSection() {
  const reviews: ProductReview[] = await getAllReviewsUseCase();

  if (!reviews) {
    return <div className="text-center">No reviews available</div>;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2">
      {reviews.map((review) => (
        <li
          key={review.reviewId}
          className="relative aspect-square w-2/3 max-w-[300px] list-none"
        >
          <ProductReviewCard review={review} />
        </li>
      ))}
    </div>
  );
}
