// _components/product-grid.tsx

import { ProductCard } from "./product-card";

type Props = {
  products: any[];
};

export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}