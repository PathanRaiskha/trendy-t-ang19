import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from './app-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../models/ApiResponse';
import { catchError, throwError } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail';
import { OrderedProducts } from '../models/ordered-products';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public static readonly endPoint='Product';

  constructor(private _http:HttpClient,private _toaster:ToastrService,private appSettings:AppSettingsService) { 

    
  }
      productForm:FormGroup=new FormGroup({
            $Id:new FormControl(0),
            quantity:new FormControl(0,[Validators.required]),
            price:new FormControl(0,[Validators.required]),
            name:new FormControl('',[Validators.required]),
            description:new FormControl('',[Validators.required]),
            isCustomizable:new FormControl(false),
            productDetail:new FormGroup({
              isFullSleeve:new FormControl(false),
              color:new FormControl('',[Validators.required]),
              material:new FormControl('',[Validators.required]),
              neckType:new FormControl('',[Validators.required]),
              size:new FormControl('',[Validators.required]),  
              frontImage:new FormControl('',[Validators.required]),              
              rightImage:new FormControl('',[Validators.required]),              
              leftImage:new FormControl('',[Validators.required]),              
              backImage:new FormControl('',[Validators.required])
            })
      });
            
      addProduct(productData:any){
              return  this._http.post<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/Product',productData).pipe(      catchError(this.handleError));
      }
      UploadProductImages(payoad:any){
        return  this._http.post<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/UploadProductImages',payoad,{headers:new HttpHeaders()}).pipe(      catchError(this.handleError));
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
      getAllProducts(){
        return  this._http.get<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/GetAllProducts').pipe(      catchError(this.handleError));
    
      }
      getAllProductsPagedAsync(pageIndex:number,pageSize:number,orderBy:string,orderByAsc:boolean,searchTerm:string){
        return  this._http.get<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/GetProductsPaged?pageIndex='+pageIndex+'&pageSize='+pageSize+'&orderBy='+orderBy+'&orderByAsc='+orderByAsc+'&searchTerm='+searchTerm)
        .pipe(      catchError(this.handleError));
    
      }
      deleteProduct(productId:number){
        return this._http.delete<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/Product?productId='+productId).pipe(      catchError(this.handleError));
    
      }
       GetProductImages(productId:number){
        
        return  this._http.get<ApiResponse>(this.appSettings.GetAppSettings().apiUrl+'Product/GetProductImages?productId='+productId).pipe(      catchError(this.handleError));
      }
}
