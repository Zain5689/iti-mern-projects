import ProductCard from "@/components/common/productCard";
import { getAllProducts } from "../services/productService";

const ProductsPage = async () => {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            All Products
          </h1>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
            Server Side • ISR 300s
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
