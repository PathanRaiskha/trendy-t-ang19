import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth= Inject(AuthenticationService) ;
  const toast= Inject(ToastrService) ;
  const router= Inject(Router) ;

    if(auth.isLoggedIn()){
      return true
    }else{
      toast.error({detail:"ERROR", summary:"Please Login First!"});
      router.navigate(['login']);
      return false;
    }
};
