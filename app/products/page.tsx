export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Package } from "lucide-react";
import Link from "next/link";
import { getPages } from "@/lib/pagination";

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const size = 12;

  const products = await prisma.product.findMany({
    skip: (page - 1) * size,
    take: size,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / size);

  const pages = getPages(page, totalPages);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="border-b max-h-[60px] border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-gray-50 rounded-full font-thin text-sm text-gray-600 border border-gray-100">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-video bg-gray-50">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
                      product.stock > 10
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : product.stock > 0
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description || "No description available"}
                  </p> */}
                </div>

                <div>
                  {/* Price and Stock */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first product
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Prev */}
          <Link
            href={`?page=${page - 1}`}
            className={`px-4 py-2 rounded-lg border text-sm font-medium ${
              page === 1
                ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
                : "border-gray-200 hover:bg-gray-100 text-gray-700"
            }`}
          >
            Prev
          </Link>

          {pages.map((p, index) =>
            p === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            ) : (
              <Link
                key={`page-${p}`}
                href={`?page=${p}`}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  p === page
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {p}
              </Link>
            ),
          )}

          {/* Next */}
          <Link
            href={`?page=${page + 1}`}
            className={`px-4 py-2 rounded-lg border text-sm font-medium ${
              page === totalPages
                ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
                : "border-gray-200 hover:bg-gray-100 text-gray-700"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
