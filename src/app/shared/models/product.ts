import { OrderedProducts } from "./ordered-products";
import { ProductDetail } from "./product-detail";
import { Review } from "./review";

export class Product {
    constructor(        
        public  Id : number=0,
        public  Quantity : number=0,
        public  Price : number=0,
        public  Name : string='',
        public  Description : string='',
        public  IsCustomizable : boolean=false,
        public ProductDetail?:ProductDetail,
        public OrdersList?:Array<OrderedProducts>,
        public Reviews?:Array<Review>
        
    ){};
    
}
