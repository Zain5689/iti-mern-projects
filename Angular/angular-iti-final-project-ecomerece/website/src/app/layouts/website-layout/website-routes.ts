import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '../../core/guards/auth.guard';

export const WEBSITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../features/home/home').then((c) => c.Home),
    title: 'E-commerce',
  },
  {
    path: 'shop',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Shop - Browse Products',
      },
      {
        path: 'category/:id',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Category',
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('../../features/products/product-details/product-details').then(
            (c) => c.ProductDetails,
          ),
        title: 'Product Details',
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../../features/products/product-list/product-list').then((c) => c.ProductList),
        title: 'Search Results',
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('../../features/about/about').then((c) => c.About),
    title: 'About Us',
  },
  {
    path: 'contact',
    loadComponent: () => import('../../features/contact/contact').then((c) => c.Contact),
    title: 'Contact Us',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('../../features/auth/login/login').then((c) => c.Login),
    title: 'Sign in',
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('../../features/auth/register/register').then((c) => c.Register),
    title: 'Create account',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('../../features/cart/cart').then((c) => c.CartPage),
    title: 'Your Cart',
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('../../features/checkout/checkout').then((c) => c.CheckoutPage),
    title: 'Checkout',
  },
  {
    path: '**',
    loadComponent: () => import('../../features/not-found/not-found').then((c) => c.NotFound),
    title: '404 - Not Found',
  },
];
