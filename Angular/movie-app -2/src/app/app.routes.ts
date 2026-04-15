import { Routes } from '@angular/router';
import { WebsiteLayout } from './layout/website-layout/website-layout/website-layout';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayout,
    loadChildren: () =>
      import('./layout/website-layout/website-routes').then((c) => c.WEBSITE_ROUTES),
  },
  {
    path: 'admin',
    component: DashboardLayout,
    loadChildren: () =>
      import('./layout/dashboard-layout/dashboar-routes').then((c) => c.DASHBOAR_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./features/pages/not-found/not-found').then((c) => c.NotFound),
  },
];
