import { authGuard } from '../../core/Guards/auth-guard';
import { isLoginGuard } from '../../core/Guards/is-login-guard';
import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../../features/home/home').then((c) => c.Home),
    title: 'MovieApp',
  },
  {
    path: 'movies',
    canActivate: [isLoginGuard],
    loadComponent: () =>
      import('./../../features/movies/movie-list/movie-list').then((c) => c.MovieList),
    title: 'Movies',
  },
  {
    path: 'movies/:id',
    canActivate: [isLoginGuard],
    loadComponent: () =>
      import('./../../features/movies/movie-details/movie-details').then((c) => c.MovieDetails),
    title: 'Movie Details',
  },
  {
    path: 'register',
    canActivate: [authGuard],
    loadComponent: () => import('../../features/auth/register/register').then((c) => c.Register),
    title: 'Register',
  },
  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: () => import('../../features/auth/login/login').then((c) => c.Login),
    title: 'Login',
  },
  {
    path: 'about',
    loadComponent: () => import('../../features/about/about').then((c) => c.About),
    title: 'About',
  },
  {
    path: 'users',
    loadComponent: () => import('../../features/auth/users/users').then((c) => c.Users),
    title: 'Users',
  },
  {
    path: 'contact',
    loadComponent: () => import('../../features/contact/contact').then((c) => c.Contact),
    title: 'Contact',
  },
];
