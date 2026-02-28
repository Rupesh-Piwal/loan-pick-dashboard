// _components/empty-state.tsx

import { Package } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Package className="w-10 h-10 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold mb-2">No products found</h3>

      <p className="text-gray-500 mb-6">
        Get started by adding your first product
      </p>

      <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
        Add Product
      </button>
    </div>
  );
}
