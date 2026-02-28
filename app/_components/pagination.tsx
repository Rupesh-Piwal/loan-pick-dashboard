// _components/pagination.tsx

import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  pages: (number | string)[];
};

export function Pagination({ page, totalPages, pages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10 flex-wrap">
      <Link
        href={`?page=${Math.max(1, page - 1)}`}
        className={`px-4 py-2 rounded-lg border text-sm ${
          page === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
        }`}
      >
        Prev
      </Link>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-3 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={`?page=${p}`}
            className={`px-4 py-2 rounded-lg border text-sm ${
              p === page
                ? "bg-gray-900 text-white border-gray-900"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={`?page=${Math.min(totalPages, page + 1)}`}
        className={`px-4 py-2 rounded-lg border text-sm ${
          page === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
