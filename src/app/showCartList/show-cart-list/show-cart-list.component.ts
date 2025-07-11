import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../../shared/services/add-to-cart.service';
import { ProductService } from '../../shared/services/product.service';
import { url } from 'inspector';

@Component({
  selector: 'app-show-cart-list',
  standalone: false,
  templateUrl: './show-cart-list.component.html',
  styleUrl: './show-cart-list.component.css'
})
export class ShowCartListComponent implements OnInit {
  frontImageName1: any ;
  cartItems: any[] = [];
  userId?:number; 
  userIdStr?:string;
   Temp?:Number;


  constructor(private cartService: AddToCartService, private productService: ProductService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
     
  


  //   this.userId=this.cartItems[0].id;
  //  for(let i=0;i<this.cartItems.length;i++){
   
  //   if(this.Temp!=this.userId){
  //     this.userId=+1;

  //      this.productService.GetProductImages(this.userId).subscribe(res => {
  //     let imageList: string[];
  //     if (res.isSuccess) {
  //       imageList = res.result;
  //       this.frontImageName1 = imageList.find(item => {
  //         return item.includes('FrontImage');
  //       });

  

  }
  getImage(item: any): string | null {
  return localStorage.getItem(item.productDetail.frontImageName1 || '');
}


 
  
}
// })

//     }
//     // this.Temp=this.userId;


//    }
   
    


//   }







 

