// services/product.service.ts

import { prisma } from "@/lib/prisma";

export const productService = {
  async getPaginatedProducts(page: number, size: number) {
    const skip = (page - 1) * size;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          stock: true,
        },
      }),
      prisma.product.count(),
    ]);

    return {
      products,
      total,
      totalPages: Math.ceil(total / size),
    };
  },
};
