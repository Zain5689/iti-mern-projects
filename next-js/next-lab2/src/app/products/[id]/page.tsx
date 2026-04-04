import { getAllProductById } from "@/app/services/productService";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAllProductById(id);

  return (
    <main className="max-w-4xl mx-auto py-2 px-6">
      <Link
        href="/products"
        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-amber-600 transition-colors mb-8 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="relative bg-gray-50 rounded-[3rem] p-12 aspect-square flex items-center justify-center overflow-hidden border border-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="p-12 object-contain hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="pt-4">
          <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.4em]">
            Premium Selection
          </span>

          <h1 className="text-5xl font-black italic uppercase tracking-tighter mt-4 mb-2 leading-none">
            {product.title}
          </h1>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
            Category: {product.category || "General"}
          </p>

          <p className="text-5xl font-black mb-10 italic text-gray-900 tracking-tighter">
            ${product.price}
          </p>

          {product.description && (
            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
              {product.description}
            </p>
          )}

          <button className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-amber-600 transition-all shadow-2xl active:scale-95">
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
}
