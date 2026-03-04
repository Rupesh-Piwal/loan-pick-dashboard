import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  pages: (number | string)[];
};

export function Pagination({ page, totalPages, pages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      {/* Prev */}
      <Link
        href={`?page=${Math.max(1, page - 1)}`}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${
          page === 1
            ? "pointer-events-none opacity-30 bg-gray-800 text-gray-500"
            : "bg-gray-900 text-gray-200 hover:bg-gray-800 hover:text-white"
        }`}
      >
        Prev
      </Link>

      {/* Page Numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-3 py-2 text-gray-500 text-sm">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={`?page=${p}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${
              p === page
                ? "bg-black text-white shadow-lg"
                : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Next */}
      <Link
        href={`?page=${Math.min(totalPages, page + 1)}`}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${
          page === totalPages
            ? "pointer-events-none opacity-30 bg-gray-800 text-gray-500"
            : "bg-gray-900 text-gray-200 hover:bg-gray-800 hover:text-white"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
