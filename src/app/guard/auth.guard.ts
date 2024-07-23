import { CanActivateFn,Router  } from '@angular/router';
import { LocalService } from '../services/local/local.service';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const localStore = inject(LocalService);

  const router = inject(Router);

  if( authService.validateToken(localStore.getData("token")).subscribe(
    (res) =>{
      return res
    }
  ))
  {
    return true
  }
  else 
  {
    router.navigate(['/login']);
    return false
  }
  
};
