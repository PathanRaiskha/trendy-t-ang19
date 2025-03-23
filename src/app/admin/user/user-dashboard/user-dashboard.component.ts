import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatDialog,MatDialogConfig,MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { ConfirmDiaogService } from '../../../shared/services/confirm-diaog.service';

@Component({
  standalone:false,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
    loading:boolean=false;

    usersList!: User[];
    totalRecords = 0;
    pageSize = 5;
    pageIndex = 0;
    dataSource:any;
    sortOnColumn:string='';
    sortDirection:boolean=true;
    serchTerm:string='';
    //columnsList:string []=["Name","Email","Mobile","Gender","Address","Actions"];
    columnsList:string []=["Name","email","Mobile","gender","address","action"];



    constructor(private userService: UserService, private confirmDiaog: ConfirmDiaogService, private toaster: ToastrService, private dialog: MatDialog){
  }
  ngOnInit(){
    this.getAllUsersPagedAsync(0,this.sortOnColumn,this.sortDirection);
    
  }

  getAllUsers(){
      this.userService.getAllUsers().subscribe(res=>{
        if(res.isSuccess){
            this.usersList=res.result;
            console.log(this.usersList);
            this.dataSource=new MatTableDataSource<User>(this.usersList);

        }
      });
  }
  getAllUsersPagedAsync(pgIndex:number,orderBy:string,orderByAsc:boolean){
    this.loading=true;
    this.userService.getAllUsersPagedAsync(pgIndex,this.pageSize,orderBy,orderByAsc,this.serchTerm).subscribe(res=>{
      if(res.isSuccess){
          this.usersList=res.result;
          this.totalRecords=Number(res.message);
          this.pageIndex=pgIndex;
          this.sortOnColumn=orderBy;
          this.sortDirection=orderByAsc;
          this.dataSource=new MatTableDataSource<User>(this.usersList);
          setTimeout(() => {
              this.loading=false;            
          }, 700);
      }
    });
  }
  handlePageEvent(e: PageEvent) {
    
    this.getAllUsersPagedAsync(e.pageIndex,this.sortOnColumn,this.sortDirection);
  }
  sortData(sortData:Sort){
      this.pageIndex=0;
      let dir=true;
      console.log(sortData);
      switch(sortData.direction.toString())
      {
            case 'asc': dir=true;break;
            case 'desc': dir=false;break;
            default:dir=!this.sortDirection; 

      }
    this.getAllUsersPagedAsync(this.pageIndex,sortData.active,dir);
  }
  searchInTable(){
    this.getAllUsersPagedAsync(this.pageIndex,this.sortOnColumn,this.sortDirection);

  }
  OnUserEdit(row:any){
   this.userService.userForm.patchValue({$Id:row.id,firstName:row.firstName,lastName:row.lastName,email:row.email,mobile:row.mobileNumber,password:row.password})
      if(row.gender==true)
        this.userService.userForm.get('gender')?.patchValue("1");
      else
         this.userService.userForm.get('gender')?.patchValue("2");

      this.userService.userForm.get('addressForm.$Id')?.patchValue(row.addressId);  
      this.userService.userForm.get('addressForm.street')?.patchValue(row.address.street);
      this.userService.userForm.get('addressForm.city')?.patchValue(row.address.city);
      this.userService.userForm.get('addressForm.district')?.patchValue(row.address.district);
      this.userService.userForm.get('addressForm.state')?.patchValue(row.address.state);
      this.userService.userForm.get('addressForm.postalCode')?.patchValue(row.address.postalCode);
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.dialog.open(EditUserComponent,dialogConfig).afterClosed().subscribe(res=>{
      if(res==false){
        this.getAllUsersPagedAsync(0,this.sortOnColumn,this.sortDirection);

      }
    });
   
  }
  
  
  onUserDelete(userId:any){
    this.confirmDiaog.openConfirmDialog('Are you sure, You want to delete this record?').afterClosed().subscribe(res=>{
      if(res){
          this.userService.deleteUser(userId).subscribe(res=>{
            if(res.isSuccess){
                  this.toaster.success('Record deleted successfully...');
                  this.getAllUsersPagedAsync(0,this.sortOnColumn,this.sortDirection);

            }
          });
      }
    });
  }

}
