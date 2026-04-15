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
    path: 'movies',
    loadComponent: () =>
      import('./../../features/movies/movie-list/movie-list').then((c) => c.MovieList),
    title: 'movies',
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./../../features/movies/movie-details/movie-details').then((c) => c.MovieDetails),
    title: 'moviesDetails',
  },
  {
    path: 'contact',
    loadComponent: () => import('./../../features/pages/contact/contact').then((c) => c.Contact),
    title: 'contact',
  },
];
