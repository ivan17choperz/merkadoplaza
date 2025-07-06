import { Routes } from '@angular/router';
import { authorizationGuardMatch } from './core/guards/authMatch.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'modules',
    canMatch: [authorizationGuardMatch],
    loadChildren: () =>
      import('./modules/modules.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
