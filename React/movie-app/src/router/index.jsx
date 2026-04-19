import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/common/BackToTop";
import PageSkeleton from "@/components/common/PageSkeleton";
import MovieDetailsSkeleton from "@/components/common/MovieDetailsSkeleton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));
const WishlistPage = lazy(() => import("@/pages/WishlistPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movie/:id",
        element: (
          <Suspense fallback={<MovieDetailsSkeleton />}>
            <MovieDetails />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
      { path: "search", element: <SearchPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
