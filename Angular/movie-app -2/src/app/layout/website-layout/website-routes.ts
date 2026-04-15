import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  {
    path: 'home',
    loadComponent: () => import('../../features/pages/home/home').then((c) => c.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('../../features/pages/about/about').then((c) => c.About),
    title: 'About',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./../../features/movies/movie-list/movie-list').then((c) => c.MovieList),
  },
  {
    path: 'products/details/:id',
    loadComponent: () =>
      import('./../../features/movies/movie-details/movie-details').then((c) => c.MovieDetails),
  },
  {
    path: 'contact',
    loadComponent: () => import('./../../features/pages/contact/contact').then((c) => c.Contact),
  },
];
