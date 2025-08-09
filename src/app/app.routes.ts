import { Routes } from '@angular/router';
import { authorizationGuardMatch } from './core/guards/authMatch.guard';
import { guestOnlyGuard } from './core/guards/reverseAuth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [guestOnlyGuard],
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
