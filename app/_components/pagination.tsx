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
      <Link
        href={`?page=${Math.max(1, page - 1)}`}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${
          page === 1
            ? "pointer-events-none opacity-30 bg-white text-gray-900"
            : "bg-white text-gray-700 hover:bg-white hover:text-gray-800"
        }`}
      >
        Prev
      </Link>

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
                ? "bg-white text-black shadow-lg"
                : "bg-white/60 text-gray-900 hover:bg-white/80 hover:text-black"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={`?page=${Math.min(totalPages, page + 1)}`}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${
          page === totalPages
            ? "pointer-events-none opacity-30 bg-white text-white"
            : "bg-white text-gray-900 hover:bg-white hover:text-gray-800"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
