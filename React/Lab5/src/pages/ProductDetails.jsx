import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useLanguage } from "@/context/LanguageContext";
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lang } = useLanguage();
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
        <Skeleton className="h-112.5 w-full rounded-3xl dark:bg-neutral-800" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4 dark:bg-neutral-800" />
          <Skeleton className="h-6 w-1/4 dark:bg-neutral-800" />
          <Skeleton className="h-24 w-full dark:bg-neutral-800" />
          <Skeleton className="h-12 w-full dark:bg-neutral-800" />
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-12 mt-10"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft
          className={`w-4 h-4 ${lang === "ar" ? "ml-2 rotate-180" : "mr-2"}`}
        />
        {lang === "en" ? "Back to Collection" : "العودة للمجموعة"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-gray-50 dark:bg-neutral-900 rounded-3xl p-8 flex justify-center items-center border border-gray-100 dark:border-neutral-800 shadow-inner">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-h-125 object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col">
          <Badge className="w-fit mb-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/40 border-none px-4 py-1">
            {product.category}
          </Badge>

          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded text-green-700 dark:text-green-400 font-bold text-sm">
              <Star
                className={`w-4 h-4 fill-green-700 dark:fill-green-400 ${lang === "ar" ? "ml-1" : "mr-1"}`}
              />
              {product.rating}
            </div>
            <span className="text-gray-400 text-sm">
              {lang === "en" ? "Brand:" : "العلامة التجارية:"}
              <b className="text-gray-700 dark:text-gray-200">
                {" "}
                {product.brand}
              </b>
            </span>
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.discountPercentage && (
              <span
                className={`text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded ${lang === "ar" ? "mr-3" : "ml-3"}`}
              >
                -{product.discountPercentage}% {lang === "en" ? "OFF" : "خصم"}
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 border dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
              <Truck className="text-amber-600 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.shippingInformation}
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 border dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
              <ShieldCheck className="text-amber-600 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.warrantyInformation}
              </span>
            </div>
          </div>

          <Button
            onClick={() => dispatch(addToCart(product))}
            className="w-full py-8 text-lg bg-black dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white transition-all rounded-2xl shadow-xl dark:shadow-none shadow-gray-200"
          >
            <ShoppingCart
              className={`h-5 w-5 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            />
            {lang === "en" ? "Add to Shopping Bag" : "إضافة إلى حقيبة التسوق"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
