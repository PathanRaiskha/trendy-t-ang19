import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { AppSettingsService } from './app-settings.service';

import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  userid?: number;
  
  authService = inject(AuthenticationService)



  // private baseUrl = 'https://localhost:5001/api/cart'; // adjust if needed

  constructor(private http: HttpClient, private appSettings: AppSettingsService, private router: Router, private authservice: AuthenticationService) { }

  addToCart(item: any) {

    if (this.authService.isLoggedIn()) {
      const StoredCartItems =localStorage.getItem("cart");
      const StoredCartItems1 = StoredCartItems ? JSON.parse(StoredCartItems) : null;
      if(StoredCartItems1==null){
           let MyArray:any[]=[];
          MyArray.push(item)
          localStorage.setItem('cart', JSON.stringify(MyArray));
      }
     
    } else {
      this.router.navigate(['/login']);  // Redirect to login

    }











    // localStorage.setItem('cart', JSON.stringify(productItem));

    // // STEP 1: Check whether the user is logged in
    // // (Assume a token or flag like "userLoggedIn" is stored in localStorage)
    // const isLoggedIn = this.authService.isLoggedIn();

    // if (isLoggedIn) {
    //   // Push empty array to localStorage if cart not already present
    //   if (!localStorage.getItem('cartItems')) {
    //     localStorage.setItem('cartItems', JSON.stringify([]));
    //   }

    //   // A) Fetch cart items from local storage
    //   const cartItemsString = localStorage.getItem('cartItems');

    //   // B) Convert cart items to JSON object
    //   let cartItems = JSON.parse(cartItemsString!);  // non-null assertion to avoid TS error

    //   // C) Push selected item into the cart object
    //   cartItems.push(productItem);

    //   // D) Save updated cart back to local storage
    //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // } else {
    //   this.router.navigateByUrl("/login")
    // }


  }


  processCartItemAfterLogin() {
    // Create cart array if not present
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  
    // Get the item that was selected
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem')!);
  
    // Get current cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')!);
  
    // Push the item
    cartItems.push(selectedItem);
  
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Optional: remove temporary selected item
    localStorage.removeItem('selectedItem');
  }
  

}
