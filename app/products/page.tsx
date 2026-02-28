// app/products/page.tsx

export const dynamic = "force-dynamic";

import { EmptyState } from "../_components/empty-state";
import Header from "../_components/Header";
import { Pagination } from "../_components/pagination";
import { ProductGrid } from "../_components/product-grid";
import { productService } from "../services/product.services";
import { getPages } from "@/lib/pagination";

type PageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const size = 12;

  const { products, totalPages } = await productService.getPaginatedProducts(
    page,
    size,
  );

  const pages = getPages(page, totalPages);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      <Header count={products.length} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <Pagination page={page} totalPages={totalPages} pages={pages} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
