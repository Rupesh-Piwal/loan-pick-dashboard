// _components/product-card.tsx

import Image from "next/image";
import { Package } from "lucide-react";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
};

function getStockStatus(stock: number) {
  if (stock > 10)
    return {
      label: "In Stock",
      styles: "bg-green-50 text-green-700 border border-green-200",
    };

  if (stock > 0)
    return {
      label: "Low Stock",
      styles: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    };

  return {
    label: "Out of Stock",
    styles: "bg-red-50 text-red-700 border border-red-200",
  };
}

export function ProductCard({ product }: Props) {
  const { label, styles } = getStockStatus(product.stock);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video bg-gray-50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
        )}

        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${styles}`}
          >
            {label}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-4 line-clamp-1">
          {product.name}
        </h3>

        <div className="pt-4 border-t border-gray-100">
          <span className="text-lg font-bold">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
