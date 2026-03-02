import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>Ecommerce</h2>
      <Link className="bg-blue-500 px-4 py-1 rounded" href="/products">
        View Products
      </Link>
    </div>
  );
}
