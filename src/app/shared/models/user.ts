import { Address } from "./address";
import { Order } from "./order";
import { Review } from "./review";
export class User {
        
        constructor(
        public  Id:number,
        public  FirstName :string,
        public  LastName:string,
        public  Email :string,
        public  Password :string,
        public  Gender :boolean,
        public  MobileNumber :string,
        public  AddressId :number,

        public Address: Address,
        public Orders: Array<Order>,
        public Reviews: Array<Review>,

        ){}
}

         
        
