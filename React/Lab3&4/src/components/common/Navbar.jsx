import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";

const Navbar = ({ itemCount = 2 }) => {
  return (
    <nav className=" container fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-30 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          Z<span className="text-amber-600">STORE</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-amber-600 ${
                    isActive ? "text-amber-600" : "text-gray-600"
                  }`
                }
              >
                <div className="relative cursor-pointer group p-2">
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />

                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white group-hover:bg-amber-600 transition-colors">
                      {itemCount}
                    </span>
                  )}
                </div>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
