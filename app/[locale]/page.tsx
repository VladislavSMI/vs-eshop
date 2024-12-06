import { Carousel } from '@/components/ui/Carousel';
import { HeroProducts } from '@/components/product/HeroProducts';
import { LocalizedSectionHeader } from '@/components/ui/LocalizedSectionHeader';
import { getAllProductsUseCase } from '@/use-cases/product';

export default async function Home() {
  const products = await getAllProductsUseCase();
  return (
    <>
      <HeroProducts />
      <LocalizedSectionHeader translationKey="sections.featuredProducts.title" />
      <Carousel products={products} />
    </>
  );
}
