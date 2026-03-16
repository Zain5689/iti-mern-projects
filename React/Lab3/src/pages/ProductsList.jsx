import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";

const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase">
          {category ? `Browsing: ${category}` : "All Products"}
        </h1>

        <div className="flex justify-center gap-3">
          <Button
            variant={category === "electronics" ? "default" : "outline"}
            onClick={() => setSearchParams({ category: "electronics" })}
          >
            Electronics
          </Button>
          <Button
            variant={category === "clothing" ? "default" : "outline"}
            onClick={() => setSearchParams({ category: "clothing" })}
          >
            Clothing
          </Button>
          <Button variant="ghost" onClick={() => setSearchParams({})}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          id="101"
          title="Wireless Headset"
          price="150"
          category="Electronics"
        />
        <ProductCard
          id="102"
          title="Mechanical Keyboard"
          price="90"
          category="Electronics"
        />
        <ProductCard
          id="103"
          title="Overcoat"
          price="120"
          category="Clothing"
        />
        <ProductCard
          id="104"
          title="Smart Watch"
          price="250"
          category="Electronics"
        />
      </div>
    </div>
  );
};

export default ProductsList;
