import { notFound } from "next/navigation";
import Category from "@/models/Category";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: `Category`,
    description: `Browse products under this category`,
  };
}

export default async function CategoryPage({ params }) {
  await dbConnect();

  // Fetch category by ID
  const category = await Category.findById(params.id);
  if (!category) return notFound();

  // Fetch products in this category
  const products = await Product.find({ category: category._id });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 flex flex-col">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-cover mb-4 rounded"
              />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-500 mt-1">${product.price}</p>
              <Link
                href={`/products/${product._id}`}
                className="mt-auto inline-block bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
