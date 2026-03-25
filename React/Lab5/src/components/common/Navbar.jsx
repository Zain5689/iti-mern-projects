import React from "react";
import { Link } from "react-router-dom";
import useThemeStore from "@/store/themeStore";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.length;
  const { lang, toggleLanguage } = useLanguage();

  return (
    <nav
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 border-b px-8 py-3 flex items-center justify-between transition-colors duration-300 ${
        isDarkMode
          ? "bg-neutral-950 border-neutral-800 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <Link to="/" className="text-xl font-black tracking-tighter">
        Z<span className="text-amber-600">STORE</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold hidden sm:block">
            {lang === "en" ? "Welcome" : "مرحباً"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-xs font-bold hover:bg-amber-600/10 hover:text-amber-600"
          >
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-amber-600/10 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <Link to="/cart" className="relative p-2 group">
            <ShoppingCart
              className={`w-6 h-6 transition-colors ${
                isDarkMode
                  ? "text-gray-300 group-hover:text-amber-500"
                  : "text-gray-700 group-hover:text-amber-600"
              }`}
            />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-neutral-950">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
