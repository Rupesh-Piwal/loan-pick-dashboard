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
      styles: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/40",
    };

  if (stock > 0)
    return {
      label: "Low Stock",
      styles: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    };

  return {
    label: "Out of Stock",
    styles: "bg-red-900/40 text-red-300 border border-red-700/40",
  };
}

export function ProductCard({ product }: Props) {
  const { label, styles } = getStockStatus(product.stock);

  return (
    <div className="group bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-2xl">
      {/* Image */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-600" />
          </div>
        )}

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${styles}`}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <h3 className="text-white text-base font-semibold mb-4 line-clamp-1">
          {product.name}
        </h3>

        <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-white tracking-tight">
            ${Number(product.price).toFixed(2)}
          </span>

          <span className="text-xs text-gray-500">
            {product.stock} available
          </span>
        </div>
      </div>
    </div>
  );
}
