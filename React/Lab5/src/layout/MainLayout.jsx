import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import useThemeStore from "@/store/themeStore";

const MainLayout = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <main className="pt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
