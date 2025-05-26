import { ProductReview } from '@/lib/types';
import { ReviewRow } from '@/data/QueryResults';
import { generateRelativeImageUrl } from '@/lib/utils/utils';

const mapReview = (row: ReviewRow): ProductReview => ({
  reviewId: row.review_id,
  productId: row.product_id,
  productName: row.product_name,
  customerName: row.customer_name,
  rating: row.rating,
  reviewText: row.review_text,
  helpfulVotes: row.helpful_votes,
  createdAt: row.created_at,
  mainImageUrl: generateRelativeImageUrl({
    productId: row.product_id,
    imageId: row.main_image_id,
    mimeType: row.mime_type,
  }),
});

export const ReviewMappers = {
  base: mapReview,
};
