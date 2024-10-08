import { CanActivateFn,Router  } from '@angular/router';
import { LocalService } from '../services/local/local.service';

import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

 
  const localStore = inject(LocalService);

  const router = inject(Router);

  if( localStore.getData("token"))
  {
    return true
  }
  else 
  {
    router.navigate(['/login']);
    return false
  }
  
};
