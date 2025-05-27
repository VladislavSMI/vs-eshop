import Image from 'next/image';
import { ProductReview } from '@/lib/types';
import { getPublicUrl, getRange } from '@/lib/utils/utils';
import { LinkWrapper } from '@/components/ui/Wrapper/LinkWrapper';
import { TiltWrapper } from '@/components/ui/Wrapper/TiltWrapper';

export const ProductReviewCard = ({
  review,
  useLink = true,
}: {
  review: ProductReview;
  useLink?: boolean;
}) => {
  const {
    customerName,
    reviewText,
    rating,
    helpfulVotes,
    mainImageUrl,
    productName,
  } = review;

  return (
    <TiltWrapper className="h-full w-full rounded-xl">
      <LinkWrapper href={`/product/${review.productId}`} useLink={useLink}>
        <div className="h-full w-full rounded-xl bg-secondary text-secondary-content">
          {mainImageUrl && (
            <Image
              src={getPublicUrl(mainImageUrl)}
              alt={`Image of ${productName}`}
              fill
              className="object-contain opacity-20"
            />
          )}
          <div className="flex h-full w-full flex-col justify-around p-6">
            <div>
              <h3 className="mb-2 text-xl font-bold text-primary">
                {productName}
              </h3>
              <p className="text-lg">{reviewText}</p>
              <p className="text-lg">— {customerName}</p>
            </div>

            <div
              className="mb-1 flex gap-4 text-2xl"
              title={`Rated ${rating} out of 5`}
            >
              {getRange(5).map((key) => (
                <span key={key} aria-hidden="true">
                  {key < rating ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <div>
              <p>👍 {helpfulVotes} people found this helpful</p>
            </div>
          </div>
        </div>
      </LinkWrapper>
    </TiltWrapper>
  );
};
