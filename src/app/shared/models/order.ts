import { Address } from "./address";
import { OrderedProducts } from "./ordered-products";
import { User } from "./user";

export class Order {
   
    constructor(
        public  Id :number,
        public  Status: string ,
        public  TotalBill: number ,
        public  OrderDate : Date,
        public  OrderStatusChangedDate: Date ,


        //ForeignKeys
        public  ShipingAddressId :number,
        public  OrderedUserId :number,

        public ShipingAddress:Address,
        public OrderedUser:User,
        public ProductList:Array<OrderedProducts>

    ) {}
}
