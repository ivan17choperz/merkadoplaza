import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StoreService } from '../services/store.service';

export const guestOnlyGuard: CanMatchFn = async () => {
  const store = inject(StoreService);
  const router = inject(Router);
  const user = await store.getData('current_user');

  return user ? router.parseUrl('/modules/store') : true;
};
