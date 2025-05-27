import { Suspense } from 'react';
import { LocalizedSectionHeader } from '@/components/ui/LocalizedSectionHeader';
import { ProductCardSkeleton } from '@/components/product/ProductCard/ProductCardSkeleton';
import { HeroProductSectionSkeleton } from '@/components/product/HeroProductSectionSkeleton';
import HeroProductSection from '@/components/product/HeroProductSection';
import ProductCarouselSection from '@/components/product/ProductCarouselSection';
import ProductReviewsCarouselSection from '@/components/product/ProductReview/ProductReviewsSection';

export default function Home() {
  return (
    <>
      <Suspense fallback={<HeroProductSectionSkeleton />}>
        <HeroProductSection />
      </Suspense>

      <LocalizedSectionHeader translationKey="sections.featuredProducts.title" />

      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductCarouselSection />
      </Suspense>

      <LocalizedSectionHeader translationKey="sections.productReviews.title" />

      <ProductReviewsCarouselSection />
    </>
  );
}
