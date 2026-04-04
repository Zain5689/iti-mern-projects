import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products (ISR)", href: "/products" },
    { name: "Recipes (Client)", href: "/recipes" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-200 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tighter"
        >
          <span className="bg-black text-white px-2 py-1 rounded-xl">N</span>
          <span>NextLab2</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-amber-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
