import { prisma } from "@/lib/prisma";
import Image from "next/image";

const page = async () => {
  const products = await prisma.product.findMany();
  console.log(products);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <p className="font-bold">{product.name}</p>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt="product-image"
                width={300}
                height={400}
              />
            )}
            <p>{product.description}</p>
            <p>{product.price.toString()}</p>
            <p>{product.stock}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
