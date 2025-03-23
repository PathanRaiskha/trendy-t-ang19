import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserStoreService } from '../../shared/services/user-store.service';


@Component({
  standalone:false,
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loading:boolean=false; 
  userRole:string='';
  public _userService=inject(UserService);
  private _toaster=inject(ToastrService);
  private _router=inject(Router);
  private authService=inject(AuthenticationService);
  private userStore=inject(UserStoreService );
  constructor(   ){

    
  }
  OnLoginClick(){
    if(this._userService.loginForm.valid){
      this.loading=true;
      this.authService.checkLogin(this._userService.loginForm.value).subscribe(res=>{
        if(res.isSuccess){
          this.authService.storeToken(res.message);
          const tokenPayload=this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload);
          this.userStore.setRoleForStore(tokenPayload);
          setTimeout(() => {
          this.loading=false;
            this._toaster.success('Login Successfull...');
            if(this.IsUserAdmin())
            this._router.navigateByUrl('/admin');
          }, 1000);
        }else{
          setTimeout(() => {
            this.loading=false;
              this._toaster.error('Login Failed...');
              
            }, 1000);
        }
      });
    }
    this.IsUserAdmin()
  }
  IsUserAdmin():boolean{
    this.userStore.getRoleFromStore().subscribe(res=>{
      let un=this.authService.getRoleFromToken();
      this.userRole=res||un;
    });
    return this.userRole=='Admin'?true:false;

  }
}
