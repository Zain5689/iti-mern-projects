import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="max-w-5xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <Skeleton className="h-112.5 w-full rounded-3xl" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <>
      {/* <div className="max-w-xl mx-auto mt-20 p-10 bg-white shadow-sm rounded-3xl border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Inspection
        </h2>

        <p className="text-gray-500 text-lg mb-8">
          Fetching detailed data for Product ID:
          <span className="ml-2 font-mono font-black text-amber-600 bg-amber-100 px-3 py-1 rounded">
            {id}
          </span>
        </p>

        <Link className="bg-amber-900 p-3 rounded-xl text-white" to={"/"}>
          back to the home page
        </Link>
      </div> */}

      <div className="max-w-6xl mx-auto px-6 py-12 mt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl p-8 flex justify-center items-center border border-gray-100 shadow-inner">
            <img
              src={product.images[0]}
              alt={product.title}
              className="max-h-125 object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge className="w-fit mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-4 py-1">
              {product.category}
            </Badge>

            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 font-bold text-sm">
                <Star className="w-4 h-4 fill-green-700 mr-1" />{" "}
                {product.rating}
              </div>
              <span className="text-gray-400 text-sm">
                Brand: <b className="text-gray-700">{product.brand}</b>
              </span>
              <span className="text-gray-400 text-sm font-medium">
                ID: {id}
              </span>
            </div>

            <div className="mb-8">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span className="ml-3 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 border rounded-2xl bg-white shadow-sm">
                <Truck className="text-amber-600 w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">
                  {product.shippingInformation}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-amber-600 w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">
                  {product.warrantyInformation}
                </span>
              </div>
            </div>

            <Button className="w-full py-8 text-lg bg-black hover:bg-amber-600 transition-all rounded-2xl shadow-xl shadow-gray-200">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Shopping Bag
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
