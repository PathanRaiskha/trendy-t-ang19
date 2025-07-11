import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
}
