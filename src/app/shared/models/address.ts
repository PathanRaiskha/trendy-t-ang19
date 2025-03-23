import { Order } from "./order";
import { User } from "./user";

export class Address {
    
    constructor(
        public Id: number,
        public Street: string,
        public City: string,
        public District: string,
        public State: string,
        public PostalCode: string,
        public Users : Array<User>,
        public Orders: Array<Order>
        ){    }

}
