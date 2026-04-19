import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Auth Store ───────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (userData) => set({ user: userData, isAuthenticated: true }),

      clearAuth: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    { name: "auth-storage" },
  ),
);

// ─── Wishlist Store ───────────────────────────────────────────────────────────
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (movie) => {
        const exists = get().wishlist.find((m) => m.id === movie.id);
        if (!exists) {
          set((state) => ({ wishlist: [...state.wishlist, movie] }));
        }
      },

      removeFromWishlist: (movieId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((m) => m.id !== movieId),
        })),

      toggleWishlist: (movie) => {
        const exists = get().wishlist.find((m) => m.id === movie.id);
        if (exists) {
          get().removeFromWishlist(movie.id);
          return false; // removed
        } else {
          get().addToWishlist(movie);
          return true; // added
        }
      },

      isInWishlist: (movieId) => get().wishlist.some((m) => m.id === movieId),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    { name: "wishlist-storage" },
  ),
);

// ─── UI/Theme Store ───────────────────────────────────────────────────────────
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      language: "en",

      toggleDark: () =>
        set((state) => {
          const newVal = !state.isDark;
          document.documentElement.classList.toggle("dark", newVal);
          return { isDark: newVal };
        }),

      setLanguage: (lang) => {
        localStorage.setItem("app_language", lang);
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
        set({ language: lang });
      },
    }),
    { name: "theme-storage" },
  ),
);
