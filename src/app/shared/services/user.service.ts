import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Address } from '../models/address';
import { Order } from '../models/order';
import { Review } from '../models/review';
import { ApiResponse } from '../models/ApiResponse';
import { catchError, throwError } from 'rxjs';
import { AppSettingsService } from './app-settings.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private _http:HttpClient,private appSettings:AppSettingsService) {    
    
  }
  
  ngOnInit(){
    
  }
  
  userForm:FormGroup=new FormGroup({
    $Id:new FormControl(0),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    mobile:new FormControl('',[Validators.required,Validators.pattern('^([0|\+[0-9]{3,3})?([-][7-9][0-9]{9})$')]),
    gender:new FormControl('1',[Validators.required]),
    addressForm:new FormGroup({
      $Id:new FormControl(0),
      street:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      district:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      postalCode:new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d{5}$/)])
  
    })
  });
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('pathanrr712@gmail.com',[Validators.required,Validators.email]),
    password:new FormControl('Test@1234',[Validators.required]),
  });
  public resetUserForm(){
    this.userForm.reset();
  }
  SignUp(userData:any){
    let u=new User(0,userData.firstName,userData.lastName,userData.email,userData.password,userData.gender==1?true:false,userData.mobile,0,
      new Address(0,userData.addressForm.street,userData.addressForm.city,userData.addressForm.district,userData.addressForm.state,userData.addressForm.postalCode,new Array<User>,new Array<Order>),new Array<Order>,new Array<Review>);
    
    return  this._http.post<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Authentication/Register?role=Admin',u).pipe(      catchError(this.handleError));
     
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  checkLogin(loginData:any){
    
    let dataToSend=[];
    dataToSend.push(loginData.email);
    dataToSend.push(loginData.password);
    
    return  this._http.post<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'User/CheckLogin',dataToSend).pipe(      catchError(this.handleError));

  }

  getAllUsers(){
    return  this._http.get<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'User/GetAllUsers').pipe(      catchError(this.handleError));

  }
  getAllUsersPagedAsync(pageIndex:number,pageSize:number,orderBy:string,orderByAsc:boolean,searchTerm:string){
    return  this._http.get<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'User/GetUsersPaged?pageIndex='+pageIndex+'&pageSize='+pageSize+'&orderBy='+orderBy+'&orderByAsc='+orderByAsc+'&searchTerm='+searchTerm)
    .pipe(      catchError(this.handleError));

  }
  EditUser(userData:any){
    let u=new User(userData.$Id,userData.firstName,userData.lastName,userData.email,userData.password,userData.gender==1?true:false,userData.mobile,userData.addressForm.$Id,
      new Address(userData.addressForm.$Id,userData.addressForm.street,userData.addressForm.city,userData.addressForm.district,userData.addressForm.state,userData.addressForm.postalCode,new Array<User>,new Array<Order>),new Array<Order>,new Array<Review>);
    
    return  this._http.put<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'User/UpdateUser',u).pipe(      catchError(this.handleError));
     
  }
  
  deleteUser(userId:number){
    return this._http.delete<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'User/User?userId='+userId).pipe(      catchError(this.handleError));

  }
}
