import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/services/user.service';

@Component({
  standalone:false,
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  loading:boolean=false;
  constructor(public _userService:UserService,private _toaster:ToastrService,public dialogRef: MatDialogRef<EditUserComponent>)
  {

  
  }
  ngOnInit(){

  }
  OnClickEdit(){
    if(this._userService.userForm.valid){
      this.loading=true;
      this._userService.EditUser(this._userService.userForm.value).subscribe(res=>{
        if(res.isSuccess){
          setTimeout(() => {
          this.loading=false;
            this._toaster.success('Updated Successfull...');
            
          }, 1000);
        }
      });
      this.OnResetUserForm();
      this.closeDialog()
    }

  }
  closeDialog() {
    this.dialogRef.close(false);
  }
  OnResetUserForm(){
    this._userService.userForm.reset();
  
   
  }
}
