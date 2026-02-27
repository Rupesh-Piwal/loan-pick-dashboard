import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding started...");

  // Clear existing data safely using transaction
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("🧹 Old data cleared.");

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "Rupesh",
      email: "rupesh@example.com",
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  console.log("👤 Users created.");

  // Real UI Products (keep these for frontend realism)
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        imageUrl:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
        price: 799.99,
        stock: 50,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard",
        imageUrl:
          "https://images.unsplash.com/photo-1626958390898-162d3577f293?w=600",
        price: 2499.0,
        stock: 30,
      },
      {
        name: "Noise Cancelling Headphones",
        description: "Over-ear bluetooth headphones",
        imageUrl:
          "https://images.unsplash.com/photo-1765279360461-e6b8199b906c?w=600",
        price: 4999.5,
        stock: 20,
      },
      {
        name: "USB-C Charger",
        description: "Fast charging 65W adapter",
        imageUrl:
          "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?w=600",
        price: 1299.0,
        stock: 40,
      },
    ],
  });

  console.log("🛍️ Real products inserted.");

  // Generate bulk products for pagination + index testing
  const bulkProducts = [];

  for (let i = 0; i < 5000; i++) {
    bulkProducts.push({
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      imageUrl: `https://picsum.photos/seed/${i}/600/400`,
      price: Math.floor(Math.random() * 10000) + 100, // 100 - 10100
      stock: Math.floor(Math.random() * 100), // 0 - 99
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365),
      ), // Random date within last 1 year
    });
  }

  await prisma.product.createMany({
    data: bulkProducts,
  });

  console.log("📦 5000 bulk products inserted.");

  console.log("✅ Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
