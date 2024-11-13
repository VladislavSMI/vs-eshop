import { ProductCard } from '@/components/product/ProductCard';
import { getAllProducts } from '@/data/repository/ProductRepository';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="flex flex-wrap justify-between gap-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
}
