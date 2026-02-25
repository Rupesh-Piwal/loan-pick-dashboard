import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding started...");

  //   Clear existing data (optional for dev)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

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

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        imageUrl:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lyZWxlc3MlMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
        price: 799.99,
        stock: 50,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard",
        imageUrl:
          "https://images.unsplash.com/photo-1626958390898-162d3577f293?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJnYiUyMGtleWJvYXJkfGVufDB8fDB8fHww",
        price: 2499.0,
        stock: 30,
      },
      {
        name: "Noise Cancelling Headphones",
        description: "Over-ear bluetooth headphones",
        imageUrl:
          "https://images.unsplash.com/photo-1765279360461-e6b8199b906c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fE5vaXNlJTIwQ2FuY2VsbGluZyUyMEhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
        price: 4999.5,
        stock: 20,
      },
      {
        name: "USB-C Charger",
        description: "Fast charging 65W adapter",
        imageUrl:
          "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VVNCLUMlMjBDaGFyZ2VyfGVufDB8fDB8fHww",
        price: 1299.0,
        stock: 40,
      },
    ],
  });

  console.log("✅ Users created:", user1.email, user2.email);
  console.log("✅ Products seeded:", products.count);
  console.log("🌱 Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
