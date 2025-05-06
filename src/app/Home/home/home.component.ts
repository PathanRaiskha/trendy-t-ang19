import { Component, inject } from '@angular/core';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';




@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor( ){

  }

  ProductService=inject(ProductService)

productlist?:any;
currentCardIndex: number = 0;
 

ngOnInit() {
   this.getAllProducts();
  }


  getAllProducts(){
    this.ProductService.getAllProducts().subscribe(res=>{
      if(res.isSuccess){
          this.productlist=res.result;
          

      }
    });
}


nextCard() {
  if (this.currentCardIndex < this.productlist.length - 1) {
    this.currentCardIndex++;
  } else {
    this.currentCardIndex = 0; // Loop back to first card
  }
}

previousCard() {
  if (this.currentCardIndex > 0) {
    this.currentCardIndex--;
  } else {
    this.currentCardIndex = this.productlist.length - 1; // Go to last card
  }
}
}

