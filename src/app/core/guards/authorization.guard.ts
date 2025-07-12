import { inject } from '@angular/core';
import { CanLoadFn, Router, type CanActivateFn } from '@angular/router';
import { StoreService } from '../services/store.service';

export const authorizationGuard: CanActivateFn = async (route, state) => {
  const storeService = inject(StoreService);
  const router = inject(Router);
  const user = await storeService.getData('current_user');

  if (!user) {
    console.log(route, state);
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

// /modules/store/products/list-products
