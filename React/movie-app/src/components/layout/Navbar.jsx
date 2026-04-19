import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Heart,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useWishlistStore, useAuthStore, useThemeStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";

const LANGUAGES = ["en", "ar", "fr", "zh"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const wishlist = useWishlistStore((s) => s.wishlist) || [];
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const { isAuthenticated, user } = useAuthStore();
  const { isDark, toggleDark, language, setLanguage } = useThemeStore();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileOpen(false);
  };

  const handleLangChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 gap-4 px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl tracking-widest font-heading text-primary shrink-0"
        >
          Movie App
        </Link>

        {/* Desktop nav links */}
        {/* <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
          <Link to="/" className="transition-colors hover:text-primary">
            {t("nav.home")}
          </Link>
          <Link to="/search" className="transition-colors hover:text-primary">
            {t("nav.search")}
          </Link>
        </nav> */}

        {/* Actions */}
        <div className="flex items-center gap-3 ms-auto">
          {/* Search icon (mobile) */}
          <button
            onClick={() => navigate("/search")}
            className="p-2 transition-colors md:hidden hover:text-primary"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
         {isAuthenticated && (
            <Link
              to="/wishlist"
              className="relative p-2 transition-colors hover:text-primary"
            >
              <Heart size={20} />
              {wishlist?.length > 0 && ( 
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {wishlist.length}
                </span>
              )}
            </Link>
          )}

          {/* Dark mode */}
          <button
            onClick={toggleDark}
            className="p-2 transition-colors hover:text-primary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1 p-2 text-sm font-semibold uppercase transition-colors hover:text-primary"
            >
              <Globe size={16} />
              {language}
            </button>
            {langOpen && (
              <div className="absolute end-0 mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden w-24">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangChange(lang)}
                    className={`block w-full text-start px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors uppercase font-semibold ${language === lang ? "text-primary" : ""}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="items-center hidden gap-2 md:flex">
              <Link
                to="/account"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <User size={18} />
                <span className="hidden lg:inline">{user?.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 transition-colors hover:text-primary"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="items-center hidden gap-2 md:flex">
              <Link to="/login" className="btn-primary text-sm py-1.5 px-4">
                {t("nav.login")}
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="p-2 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          {/* <Link to="/" onClick={() => setMobileOpen(false)}>
            {t("nav.home")}
          </Link>
          <Link to="/search" onClick={() => setMobileOpen(false)}>
            {t("nav.search")}
          </Link> */}
          {isAuthenticated ? (
            <>
              <Link to="/account" onClick={() => setMobileOpen(false)}>
                {t("nav.account")}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 text-start"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                {t("nav.login")}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
