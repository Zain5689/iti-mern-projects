import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="w-full bg-white dark:bg-neutral-950 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-neutral-900 py-8 mt-auto transition-colors">
      <div
        className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3 text-center"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <p className="text-sm font-medium tracking-tight">
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-600 font-black">Z-Store</span>.{" "}
          {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
