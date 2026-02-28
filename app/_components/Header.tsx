type Props = {
  count: number;
};

const Header = ({ count }: Props) => {
  return (
    <div className="border-b max-h-[60px] border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-gray-50 rounded-full font-thin text-sm text-gray-600 border border-gray-100">
              {count} {count === 1 ? "product" : "products"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
