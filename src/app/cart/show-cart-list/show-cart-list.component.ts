import { Component, Input, OnInit } from '@angular/core';
import { AddToCartService } from '../../shared/services/add-to-cart.service';
import { ProductService } from '../../shared/services/product.service';
import { url } from 'inspector';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-cart-list',
  standalone: false,
  templateUrl: './show-cart-list.component.html',
  styleUrl: './show-cart-list.component.css'
})
export class ShowCartListComponent implements OnInit {

  cartItems: any[] = [];
  userId?: number;
  userIdStr?: string;
  Temp?: Number;



  @Input() productItem?: any;
  currentImage?: string;



  constructor(private cartService: AddToCartService, private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
   
    this.cartItems = this.cartService.getCartItems();
    this.currentImage= this.cartItems[0]?.productDetail?.frontImage;

  };

};
