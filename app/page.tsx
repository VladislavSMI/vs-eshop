import { ProductCard } from '@/components/product/ProductCard';
import { getAllProducts } from '@/data/repository/ProductRepository';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-wrap justify-between gap-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </main>
      <footer className="mt-16 flex flex-wrap items-center justify-center gap-6">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
