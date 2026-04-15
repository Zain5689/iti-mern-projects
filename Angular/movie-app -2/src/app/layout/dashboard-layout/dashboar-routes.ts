import { Routes } from '@angular/router';

export const DASHBOAR_ROUTES: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('../../features/movies/dashboard-movie-list/dashboard-movie-list').then(
        (c) => c.DashboardMovieList,
      ),
  },
];
