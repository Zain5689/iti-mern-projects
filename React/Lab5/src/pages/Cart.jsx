import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { Trash2, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { lang } = useLanguage();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const t = {
    en: {
      title: "Your Shopping Cart",
      summary: "Order Summary",
      items: "Total Items:",
      total: "Total:",
      checkout: "Checkout Now",
      empty: "Your cart is empty!",
      goShopping: "Go Shopping",
    },
    ar: {
      title: "حقيبة التسوق الخاصة بك",
      summary: "ملخص الطلب",
      items: "إجمالي العناصر:",
      total: "الإجمالي:",
      checkout: "إتمام الشراء الآن",
      empty: "حقيبة التسوق فارغة!",
      goShopping: "اذهب للتسوق",
    },
  };

  const content = t[lang];

  return (
    <div
      className="max-w-4xl mx-auto p-8 mt-10 min-h-screen transition-colors"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl font-black mb-8 dark:text-white flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-amber-600" />
        {content.title}
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-neutral-800 rounded-lg p-1 border dark:border-neutral-700">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-bold text-amber-600">${item.price}</p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full shrink-0"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-2xl h-fit border dark:border-neutral-800 shadow-sm">
            <h2 className="text-xl font-bold mb-4 dark:text-white border-b dark:border-neutral-800 pb-2">
              {content.summary}
            </h2>
            <div className="flex justify-between mb-4 dark:text-gray-300">
              <span>{content.items}</span>
              <span className="font-bold">{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-xl font-black border-t dark:border-neutral-800 pt-4 dark:text-white">
              <span>{content.total}</span>
              <span className="text-amber-600">${total}</span>
            </div>
            <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-amber-600/20 transition-all">
              {content.checkout}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-neutral-900/40 rounded-3xl border-2 border-dashed border-gray-200 dark:border-neutral-800">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-neutral-700" />
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-xl font-medium">
            {content.empty}
          </p>
          <Button
            asChild
            className="bg-amber-600 hover:bg-amber-700 px-8 py-6 rounded-xl text-lg font-bold"
          >
            <Link to="/">{content.goShopping}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
