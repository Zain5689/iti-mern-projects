import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Auth + cart + checkout depend on browser-side auth state — render on client.
  {
    path: 'shop/category/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'shop/product/:id',
    renderMode: RenderMode.Server,
  },
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'register', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
