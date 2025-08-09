import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StoreService } from '../services/store.service';

export const authorizationGuardMatch: CanMatchFn = async (route, segments) => {
  const store = inject(StoreService);
  const router = inject(Router);
  const user = await store.getData('current_user');

  return user ? true : router.parseUrl('/auth/login');
};
