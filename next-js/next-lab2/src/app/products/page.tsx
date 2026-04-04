import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "../services/productService";

const ProductsPage = async () => {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-10 tracking-tighter uppercase italic">
        All Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group"
          >
            <div className="border p-6 rounded-[2.5rem] bg-gray-50 shadow-sm border-transparent hover:border-amber-400 transition-all duration-300 h-full flex flex-col">
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <h2 className="font-bold text-xl line-clamp-1">
                {product.title}
              </h2>
              <p className="text-amber-600 font-black mt-auto pt-2 text-2xl tracking-tighter">
                ${product.price}
              </p>

              <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                View Details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
