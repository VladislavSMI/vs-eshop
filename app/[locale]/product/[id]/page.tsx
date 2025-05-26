import React from 'react';
import { Locale } from '@/lib/types';
import {
  getProductByIdUseCase,
  getProductSearchUseCase,
} from '@/use-cases/product';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';
import { ProductCardDetails } from '@/components/product/ProductCard/ProductCardDetails';
import { Carousel } from '@/components/ui/Carousel';
import { LocalizedSectionHeader } from '@/components/ui/LocalizedSectionHeader';
import { ProductReviewCard } from '@/components/product/ProductReviewCard';

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const { locale, id } = params;

  const productDetails = await getProductByIdUseCase(id, locale);
  const productCarousel = await getProductSearchUseCase({
    searchParams: { limit: 12 },
  });

  return (
    <div className="mx-auto mt-5 max-w-screen-2xl px-5 pb-5">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square rounded-lg sm:aspect-square md:mr-7 md:aspect-auto md:basis-1/2">
          <ProductCardWrapper
            product={productDetails}
            useTilt
            useLink={false}
            showPrice={false}
          />
        </div>
        <div className="mt-5 rounded-lg bg-secondary p-5 md:mt-0 md:basis-1/2">
          <ProductCardDetails product={productDetails} />
        </div>
      </div>
      <LocalizedSectionHeader translationKey="sections.newArrivals.title" />

      <Carousel>
        {productCarousel.map((product) => (
          <li
            key={product.productId}
            className="relative aspect-square w-2/3 max-w-[300px] flex-none"
          >
            <ProductCardWrapper product={product} useTilt useLink />
          </li>
        ))}
      </Carousel>

      {productDetails.reviews.length > 0 && (
        <>
          <LocalizedSectionHeader translationKey="sections.productReviews.title" />
          <div className="flex flex-wrap items-center justify-center gap-4 p-2">
            {productDetails.reviews.map((review) => (
              <li
                key={review.reviewId}
                className="relative aspect-square w-2/3 max-w-[300px] list-none"
              >
                <ProductReviewCard review={review} useLink={false} />
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
