import { Routes } from '@angular/router';
import StoreComponent from './store.component';
import { authorizationGuard } from 'src/app/core/guards/authorization.guard';
import { authorizationGuardMatch } from 'src/app/core/guards/authMatch.guard';

export const routes: Routes = [
  {
    path: 'products',
    component: StoreComponent,
    children: [
      {
        path: 'list-products',
        canActivate: [authorizationGuard],
        loadComponent: () => import('./pages/products/products.component'),
      },

      {
        path: 'payment-products',
        canActivate: [authorizationGuard],
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
