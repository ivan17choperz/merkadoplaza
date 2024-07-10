import { Routes } from '@angular/router';
import StoreComponent from './store.component';

export const routes: Routes = [
  {
    path: 'products',
    component: StoreComponent,
    children: [
      {
        path: 'list-products',
        loadComponent: () => import('./pages/products/products.component'),
      },

      {
        path: 'payment-products',
        loadComponent: () => import('./pages/payment/payment.component'),
      },
      {
        path: '**',
        redirectTo: 'list-products',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
