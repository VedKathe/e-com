import { CanActivateFn,Router  } from '@angular/router';
import { LocalService } from '../services/local/local.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const localStore = inject(LocalService);

  const router = inject(Router);

  const user =  localStore.getData("user")
  if( user.role == "a")
  {
    return true
  }
  else 
  {
    router.navigate(['/']);
    return false
  }
};
