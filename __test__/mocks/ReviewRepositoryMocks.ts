import { ProductReview } from '@/lib/types';

export const mockReviews: ProductReview[] = [
  {
    reviewId: 'r1',
    productId: '123456789',
    productName: 'Skate deck',
    customerName: 'Alice',
    rating: 5,
    reviewText: 'Amazing deck, super solid!',
    helpfulVotes: 12,
    createdAt: '2024-01-15T10:00:00Z',
    mainImageUrl: null,
  },
  {
    reviewId: 'r2',
    productId: '987654321',
    productName: 'Skate trucks',
    customerName: 'Bob',
    rating: 4,
    reviewText: 'Pretty decent trucks, but a bit heavy.',
    helpfulVotes: 5,
    createdAt: '2024-02-20T15:30:00Z',
    mainImageUrl: null,
  },
  {
    reviewId: 'r3',
    productId: '159357456',
    productName: 'Skate wheels',
    customerName: 'Charlie',
    rating: 3,
    reviewText: 'Wheels are okay, but wear down fast.',
    helpfulVotes: 2,
    createdAt: '2024-03-10T08:45:00Z',
    mainImageUrl: null,
  },
];
