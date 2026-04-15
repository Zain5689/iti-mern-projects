import { Routes } from '@angular/router';

export const DASHBOAR_ROUTES: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    loadComponent: () =>
      import('../../features/movies/dashboard-movie-list/dashboard-movie-list').then(
        (c) => c.DashboardMovieList,
      ),
    title: 'admin/movies',
  },
];
