import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className=" container fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          TECH<span className="text-amber-600">STORE</span>
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
                Cart
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
