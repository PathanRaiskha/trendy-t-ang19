import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from './app-settings.service';
import { ApiResponse } from '../models/ApiResponse';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userPayload: any;

  constructor(
    private _http: HttpClient,
    private appSettings: AppSettingsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object // ✅ Inject platform check
  ) {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Run only if in browser
      this.userPayload = this.decodedToken();
    }
  }

  
  checkLogin(loginData:any){
    
    let dataToSend=[];
    dataToSend.push(loginData.email);
    dataToSend.push(loginData.password);
    
    return  this._http.post<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Authentication/CheckLogin',dataToSend);

  }

  storeToken(tokenValue: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenValue);
    }
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }


  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    //console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.userPayload = undefined;
    this.router.navigate(['login']);
  }
  
  getfullNameFromToken(){
    if(this.userPayload){
      let aa=Object.keys(this.userPayload).filter((x)=>{return x.includes('name')})[0]
      var ans=this.userPayload[aa as keyof typeof this.userPayload]
      return ans;
    }
    return "";
  }

  getRoleFromToken(){
    if(this.userPayload){
      let aa=Object.keys(this.userPayload).filter((x)=>{return x.includes('role')})[0]
      var ans=this.userPayload[aa as keyof typeof this.userPayload]
      return ans;
    }
    return "";
  }

  renewToken(tokenApi : any){
    return this._http.post<any>("", tokenApi)
  }

}
