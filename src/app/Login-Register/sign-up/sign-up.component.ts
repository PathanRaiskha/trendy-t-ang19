import { Component, ViewChild,inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';


@Component({
  standalone:false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
 loading:boolean=false;
 public _userService=inject(UserService);
 private _toaster=inject(ToastrService);
  constructor(){
  }

  ngOnInit(){
//this.loading=true;
  }
  OnSignUpClick(){
    if(this._userService.userForm.valid){
      this.loading=true;
      this._userService.SignUp(this._userService.userForm.value).subscribe(res=>{
        if(res.isSuccess){
          setTimeout(() => {
          this.loading=false;
          this._toaster.success('SignUp Successfull...');
          this.OnResetUserForm();            
          }, 1000);
        }
      });
      
    }

  }
  OnResetUserForm(){
    this._userService.userForm.reset();
  
   
  }
  
}
