import { getAllProducts } from '@/data/repository/ProductRepository';
import { filterProductByTag } from '@/lib/utils/productUtils';
import { ProductCardWrapper } from './ProductCard/ProductCardWrapper';
import { HeroProduct3dModel } from './Product3dModel';

export async function HeroProducts() {
  // ToDo query directly hero products from DB
  const heroProducts = await getAllProducts();

  const { filteredProducts: heroProduct3d, restProducts } = filterProductByTag(
    heroProducts,
    'New',
  );

  if (!heroProduct3d?.length || restProducts.length < 4) {
    return null;
  }

  return (
    <section className="mx-auto mt-5 grid max-w-screen-2xl grid-cols-1 gap-8 px-5 pb-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-6 lg:max-h-[calc(100vh-100px)]">
      {heroProduct3d && (
        <div className="aspect-square h-full w-full rounded-lg md:col-span-2 md:row-span-2">
          <ProductCardWrapper
            product={heroProduct3d[0]}
            useTilt={false}
            useLink={false}
            imageComponent={<HeroProduct3dModel />}
            position="center"
          />
        </div>
      )}

      {restProducts.slice(0, 4).map((product) => (
        <div className="md:col-span-2 md:row-span-1" key={product.productId}>
          <ProductCardWrapper product={product} useTilt useLink />
        </div>
      ))}
    </section>
  );
}
