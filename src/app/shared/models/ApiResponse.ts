export class ApiResponse {
    constructor(
        public message :string,
        public isSuccess:boolean,
        public result:any
    ){}
}