import { Routes } from '@angular/router';
import { WebsiteLayout } from './layouts/website-layout/website-layout/website-layout';
import { UserOrdersComponent } from './features/user-orders/user-orders';
export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayout,
    loadChildren: () =>
      import('./layouts/website-layout/website-routes').then((c) => c.WEBSITE_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((c) => c.NotFound),
  },
  { path: 'user-orders', component: UserOrdersComponent }
];
