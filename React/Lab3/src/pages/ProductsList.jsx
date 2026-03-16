import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";
import axios from "axios";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const ProductsList = () => {
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
        console.error("Error fetching products:", error);
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
      <div className="max-w-6xl mx-auto px-6 py-12 mt-6">
        <div className="flex flex-col items-center mb-12 space-y-4">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="w-full max-w-sm mx-auto border-none shadow-md overflow-hidden"
            >
              <div className="p-4">
                <Skeleton className="aspect-video w-full rounded-xl" />
              </div>
              <CardHeader className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <div className="px-6 pb-6 flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 mt-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
          {category ? `Browsing: ${category}` : "All Products"}
        </h1>

        <div className="flex justify-center gap-3">
          <Button
            variant={category === "beauty" ? "default" : "outline"}
            onClick={() => {
              setSearchParams({ category: "beauty" });
              setCurrentPage(1);
            }}
          >
            Beauty
          </Button>
          <Button
            variant={category === "fragrances" ? "default" : "outline"}
            onClick={() => {
              setSearchParams({ category: "fragrances" });
              setCurrentPage(1);
            }}
          >
            Fragrances
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchParams({});
              setCurrentPage(1);
            }}
          >
            Reset
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
                Previous
              </Button>
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber <= 5) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}
                      className={
                        currentPage === pageNumber
                          ? "bg-black text-white"
                          : "hover:bg-amber-50"
                      }
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="hover:bg-amber-50"
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductsList;
