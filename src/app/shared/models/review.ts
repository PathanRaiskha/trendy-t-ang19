import { Product } from "./product";
import { User } from "./user";

export class Review {
    constructor(
        public  Rating : number,
        public  Comment : string,

        //ForeignKeys
        public  ReviewerId : number,
        public  ProductId : number,
        public Reviewer:User,
        public Product:Product

    ){}
}
