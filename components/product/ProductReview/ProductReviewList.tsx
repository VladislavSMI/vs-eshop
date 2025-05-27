import { ProductReviewCard } from '@/components/product/ProductReview/ProductReviewCard';
import { ProductReview } from '@/lib/types';

export function ProductReviewList({
  reviews,
  useLink = true,
}: {
  reviews: ProductReview[];
  useLink?: boolean;
}) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-4">
      {reviews.map((review) => (
        <li
          key={review.reviewId}
          className="relative block aspect-square w-[95%] max-w-[500px] list-none md:w-2/3 md:max-w-[300px]"
        >
          <ProductReviewCard review={review} useLink={useLink} />
        </li>
      ))}
    </ul>
  );
}
