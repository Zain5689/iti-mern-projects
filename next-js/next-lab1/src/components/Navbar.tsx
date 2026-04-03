import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-100 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-black tracking-tighter text-black"
        >
          <span className="bg-black text-white px-2 py-0.5 rounded-lg group-hover:bg-amber-500 transition-colors">
            L
          </span>
          <span>Lab1</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-semibold text-[13px] uppercase tracking-widest text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-black transition-all hover:tracking-[0.2em] relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-black transition-all hover:tracking-[0.2em] relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="hover:text-black transition-all hover:tracking-[0.2em] relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/Docs"
              className="hover:text-black transition-all hover:tracking-[0.2em] relative group"
            >
              Docs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/info"
              className="bg-black text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-all shadow-lg shadow-black/10 active:scale-95"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
