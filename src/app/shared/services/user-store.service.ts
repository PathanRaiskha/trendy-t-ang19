import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");


constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(userPayload:any){
    if(userPayload){
      let aa=Object.keys(userPayload).filter((x)=>{return x.includes('role')})[0]
      var ans=userPayload[aa as keyof typeof userPayload]
      this.role$.next(ans);
    }else{
      this.role$.next("");

    }
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(userPayload:any){
    if(userPayload){
      let aa=Object.keys(userPayload).filter((x)=>{return x.includes('name')})[0]
      var ans=userPayload[aa as keyof typeof userPayload]
      this.fullName$.next(ans);
    }else{
      this.fullName$.next("");

    }
  }
}
