import { getProductSearchUseCase } from '@/use-cases/product';
import { HeroProducts } from './HeroProducts';

export default async function HeroProductSection() {
  const heroProducts = await getProductSearchUseCase({
    searchParams: { limit: 5, tagNames: ['New', 'On Sale'] },
  });

  return <HeroProducts products={heroProducts} />;
}
