import { executeQuery } from '@/lib/db';
import { ProductReview } from '@/lib/types';
import { isMockEnabled } from '@/lib/utils/utils';
import { mockReviews } from '@/__test__/mocks/ReviewRepositoryMocks';
import { ReviewMappers } from '../mappers/reviewMappers';
import { ReviewRow } from '../QueryResults';

export async function getAllReviews(limit?: number): Promise<ProductReview[]> {
  if (isMockEnabled()) {
    return mockReviews;
  }

  const query = `
    SELECT
      r.review_id,
      r.product_id,
      r.customer_name,
      r.rating,
      r.review_text,
      r.helpful_votes,
      r.created_at,
      p.product_name,
      p.main_image_id,
      pi.mime_type
    FROM reviews r
    LEFT JOIN products p ON p.product_id = r.product_id
    LEFT JOIN product_images pi ON pi.product_id = r.product_id
    WHERE p.main_image_id IS NOT NULL
    ${limit ? `LIMIT ${limit}` : ''}
  `;

  const data = await executeQuery<ReviewRow>({ query });
  return data.rows.map(ReviewMappers.base);
}
