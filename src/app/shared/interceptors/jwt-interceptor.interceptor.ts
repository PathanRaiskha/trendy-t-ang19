import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private toast: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Exclude the registration URL from the interceptor
    if (request.url.includes('/register')) {
      return next.handle(request);  // Skip the interceptor logic for this request
    }

    
    const myToken = this.auth.getToken();
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}  // "Bearer "+myToken
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toast.warning("Token is expired, Please Login again");
            this.router.navigate(['login']);
            // return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=> err)
      })
    );
  }
  // handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
  //   let tokeApiModel = new TokenApiModel();
  //   tokeApiModel.accessToken = this.auth.getToken()!;
  //   tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
  //   return this.auth.renewToken(tokeApiModel)
  //   .pipe(
  //     switchMap((data:TokenApiModel)=>{
  //       this.auth.storeRefreshToken(data.refreshToken);
  //       this.auth.storeToken(data.accessToken);
  //       req = req.clone({
  //         setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
  //       })
  //       return next.handle(req);
  //     }),
  //     catchError((err)=>{
  //       return throwError(()=>{
  //         this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
  //         this.router.navigate(['login'])
  //       })
  //     })
  //   )
  // }
}
