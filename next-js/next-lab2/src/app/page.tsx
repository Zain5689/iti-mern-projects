import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className=" py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Link
            href="/products"
            className="group relative overflow-hidden rounded-[3rem] bg-white p-12 shadow-sm border border-transparent hover:border-amber-200 transition-all"
          >
            <div className="relative z-10">
              <span className="text-amber-500 font-black text-4xl mb-4 block italic">
                01.
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
                Products
              </h3>
              <p className="text-gray-400 font-medium mb-0">
                Server-side fetching with 300s ISR caching for maximum
                performance.
              </p>
            </div>
          </Link>

          <Link
            href="/recipes"
            className="group relative overflow-hidden rounded-[3rem] bg-white p-12 shadow-sm border border-transparent hover:border-amber-200 transition-all"
          >
            <div className="relative z-10">
              <span className="text-amber-500 font-black text-4xl mb-4 block italic">
                02.
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
                Recipes
              </h3>
              <p className="text-gray-400 font-medium mb-0">
                Client-side fetching through a secure local Proxy Route handler.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
