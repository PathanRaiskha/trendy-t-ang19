import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { AddToCartService } from '../../shared/services/add-to-cart.service';



@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
constructor(private cartService:AddToCartService,private authService: AuthenticationService,private router: Router){

}

  @Input() productItem?: any;
  currentImage?: string;

  ngOnInit() {
     this.currentImage = this.productItem?.productDetail?.frontImage; // Default image


    this.imageList = [
      this.productItem?.productDetail?.frontImage,
      this.productItem?.productDetail?.backImage,
      this.productItem?.productDetail?.leftImage,
      this.productItem?.productDetail?.rightImage,
    ];
  
    this.currentImage = this.imageList[this.currentImageIndex];
  }
  
  changeImage(view: string) {
    switch (view) {
      case 'front':
        this.currentImage = this.productItem?.productDetail?.frontImage;
        break;
      case 'back':
        this.currentImage = this.productItem?.productDetail?.backImage;
        break;
      case 'left':
        this.currentImage = this.productItem?.productDetail?.leftImage;
        break;
      case 'right':
        this.currentImage = this.productItem?.productDetail?.rightImage;
        break;
      default:
        this.currentImage = this.productItem?.productDetail?.frontImage;
    }
  }

  imageList: string[] = []; // list of images: front, back, left, right
currentImageIndex: number = 0;




nextImage() {
  this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length;
  this.currentImage = this.imageList[this.currentImageIndex];
}

previousImage() {
  this.currentImageIndex = (this.currentImageIndex - 1 + this.imageList.length) % this.imageList.length;
  this.currentImage = this.imageList[this.currentImageIndex];
}




 addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in to add items to your cart');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product);
  }
}



  


  


