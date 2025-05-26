import dynamic from 'next/dynamic';
import { Product } from '@/lib/types';
import { ProductCardWrapper } from './ProductCard/ProductCardWrapper';

const HeroProduct3dModel = dynamic(
  () => import('./HeroProduct3dModel').then((mod) => mod.HeroProduct3dModel),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square h-full w-full animate-pulse rounded-lg" />
    ),
  },
);

export const HeroProducts = ({ products }: { products: Product[] }) => {
  if (!products?.length) return null;

  // Temporarily hardcoded to just randomly select the hero product, later create a new category for 3D models
  const hero3DProduct =
    products.find((product) => product.categoryId === 1) || products[0];

  // Exclude the 3d hero product from the rest of the grid
  const heroProducts = products
    .filter((product) => product.productId !== hero3DProduct.productId)
    .slice(0, 4);

  return (
    <section className="mx-auto mt-5 grid max-w-screen-2xl grid-cols-1 grid-rows-2 gap-8 px-5 md:grid-cols-6 lg:max-h-[calc(100vh-100px)]">
      <div className="aspect-square h-full w-full rounded-lg md:col-span-2 md:row-span-2">
        <ProductCardWrapper
          product={hero3DProduct}
          useTilt={false}
          useLink={false}
          imageComponent={<HeroProduct3dModel />}
          position="center"
        />
      </div>

      {heroProducts.map((product) => (
        <div className="md:col-span-2 md:row-span-1" key={product.productId}>
          <ProductCardWrapper product={product} useTilt useLink />
        </div>
      ))}
    </section>
  );
};
