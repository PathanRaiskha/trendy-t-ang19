import { Order } from "./order";
import { Product } from "./product";

export class OrderedProducts {
    constructor(
        
        public  ProductQuantity :number,

        //ForeignKeys
        public  OrderId :number,
        public  ProductId :number,

        public Order:Order,
        public Product:Product
    ){}
}
