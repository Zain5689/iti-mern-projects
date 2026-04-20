import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  {
    path: 'home',
    loadComponent: () => import('../../features/home/home').then((c) => c.Home),
    title: 'MovieApp',
  },
  {
    path: 'about',
    loadComponent: () => import('../../features/about/about').then((c) => c.About),
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
    loadComponent: () => import('../../features/contact/contact').then((c) => c.Contact),
    title: 'contact',
  },
  {
    path: 'register',
    loadComponent: () => import('../../features/auth/register/register').then((c) => c.Register),
    title: 'register',
  },
];
