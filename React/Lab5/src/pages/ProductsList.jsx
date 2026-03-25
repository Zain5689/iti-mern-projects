import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";
import axios from "axios";

import { useLanguage } from "@/context/LanguageContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const ProductsList = () => {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 6;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        );
        setProducts(response.data.products);
        setTotal(response.data.total);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase()),
      )
    : products;

  if (loading)
    return (
      <div
        className="max-w-6xl mx-auto px-6 py-6"
        dir={lang === "ar" ? "rtl" : "ltr"}
      ></div>
    );

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-20 mt-4"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
          {category ? (
            <>
              {lang === "en" ? "Browsing: " : "تصفح: "}
              <span className="text-amber-600">{category}</span>
            </>
          ) : lang === "en" ? (
            "All Products"
          ) : (
            "جميع المنتجات"
          )}
        </h1>

        <div className="flex justify-center gap-3">
          <Button
            variant={category === "beauty" ? "default" : "outline"}
            onClick={() => {
              setSearchParams({ category: "beauty" });
              setCurrentPage(1);
            }}
          >
            {lang === "en" ? "Beauty" : "الجمال"}
          </Button>
          <Button
            variant={category === "fragrances" ? "default" : "outline"}
            onClick={() => {
              setSearchParams({ category: "fragrances" });
              setCurrentPage(1);
            }}
          >
            {lang === "en" ? "Fragrances" : "العطور"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchParams({});
              setCurrentPage(1);
            }}
          >
            {lang === "en" ? "Reset" : "إعادة ضبط"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Pagination>
          <PaginationContent className="flex-wrap justify-center">
            <PaginationItem>
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="hover:bg-amber-50"
              >
                {lang === "en" ? "Previous" : "السابق"}
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="hover:bg-amber-50"
              >
                {lang === "en" ? "Next" : "التالي"}
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductsList;
