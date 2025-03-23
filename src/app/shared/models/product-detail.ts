import { ProductColor,Material,NeckType,ProductSize } from "../enums/our-enum";
import { Product } from "./product";

export class ProductDetail {
    constructor(
        public  Id : number=0,
        public  IsFullSleeve : boolean=false,
        public  Color? : ProductColor,
        public  Material? : Material,
        public  NeckType? : NeckType,
        public  Size? : ProductSize,
        public FrontImage?:string,
        public BackImage?:string,
        public LeftImage?:string,
        public RightImage?:string,
        public  ProductId : number=0,
        public Product?:Product
    ){}
}
