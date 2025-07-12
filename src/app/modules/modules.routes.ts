import { Routes } from '@angular/router';
import { authorizationGuard } from '../core/guards/authorization.guard';

export const routes: Routes = [
  {
    path: 'store',
    canActivate: [authorizationGuard],
    loadChildren: () => import('./store/store.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'store',
    pathMatch: 'full',
  },
];
