import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product.service';
import { Material, NeckType, ProductColor, ProductSize } from '../../../shared/enums/our-enum';
import { Product } from '../../../shared/models/product';
import { ProductDetail } from '../../../shared/models/product-detail';


@Component({
  standalone:false,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productColors:string[]=[];
  productMaterial:string[]=[];
  productNeckType:string[]=[];
  productSize:string[]=[];

  frontImageName1:any;
  frontImageName2:any;
  frontImageName3:any;
  frontImageName4:any;

  imageToSend1:any;
  imageToSend2:any;
  imageToSend3:any;
  imageToSend4:any;

  frontImageName: string = '';
  backImageName: string = '';
  leftImageName: string = '';
  rightImageName: string = '';

  blankImagePath:string='/assets/images/image_blank.svg';
  loading: boolean = false;
  ProductId:number=0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {isForUpdate: boolean},
    public productService:ProductService,
    private toaster:ToastrService,
    private dialogRef:MatDialogRef<ProductDetailComponent>
    ){
  }
  ngOnInit(){
    this.populateDDL();
    if(this.data.isForUpdate){
      this.ProductId=this.productService.productForm.get('$Id')?.value;
      this.fetchProductImages();
    }
  }
  fetchProductImages(){

    
      this.productService.GetProductImages(this.ProductId).subscribe(res=>{
        let imageList:string[];
          if(res.isSuccess){
            imageList=res.result;
            this.frontImageName1=imageList.find(item=>{
              return item.includes('FrontImage');
            });
            this.frontImageName2=imageList.find(item=>{
              return item.includes('BackImage');
            });
            this.frontImageName3=imageList.find(item=>{
              return item.includes('LeftImage');
            });
            this.frontImageName4=imageList.find(item=>{
              return item.includes('RightImage');
            });

          }
      });
    
    
  }
  
  populateDDL(){
    for (var n in ProductColor) {
      if (typeof ProductColor[n] === 'number') {
        this.productColors.push(n);

      }
    }

    for (var n in Material) {
      if (typeof Material[n] === 'number') {
        this.productMaterial.push(n);

      }
    }

    for (var n in NeckType) {
      if (typeof NeckType[n] === 'number') {
        this.productNeckType.push(n);

      }
    }
    for (var n in ProductSize) {
      if (typeof ProductSize[n] === 'number') {
        this.productSize.push(n);

      }
    }
  }
  OnResetProductForm(){
    //console.log(this.productService.productForm.value);
    this.productService.productForm.reset();
    this.frontImageName1=this.frontImageName2=this.frontImageName3=this.frontImageName4='';
    this.frontImageName=this.backImageName=this.leftImageName=this.rightImageName='';
  }
  updateProduct(){

  }
  addProduct(){
              let productInfo=new Product(0,
                    this.productService.productForm.get('quantity')?.value,
                    this.productService.productForm.get('price')?.value,
                    this.productService.productForm.get('name')?.value,
                    this.productService.productForm.get('description')?.value,
                    this.productService.productForm.get('isCustomizable')?.value,
                    new ProductDetail(
                      0,
                      this.productService.productForm.get('productDetail.isFullSleeve')?.value,
                      this.productService.productForm.get('productDetail.color')?.value,
                      this.productService.productForm.get('productDetail.material')?.value,
                      this.productService.productForm.get('productDetail.neckType')?.value,
                      this.productService.productForm.get('productDetail.size')?.value,
                      undefined,
                      undefined,
                      undefined,
                      undefined,

                      0,
                      undefined
                    ),
                    undefined,
                    undefined
                );

        const formData:FormData=new FormData();
        formData.append('FrontImage',this.imageToSend1);
        formData.append('BackImage',this.imageToSend2);
        formData.append('LeftImage',this.imageToSend3);
        formData.append('RightImage',this.imageToSend4);
        



        this.loading=true;

        this.productService.addProduct(productInfo).subscribe(res=>{
            if(res.isSuccess){
                formData.append('ProductId',res.result.toString());

                this.productService.UploadProductImages(formData).subscribe(res=>{
                  if(res.isSuccess){
                    this.OnResetProductForm();            
                    setTimeout(() => {
                      this.dialogRef.close(false);
                      this.loading=false;
                      this.toaster.success('SignUp Successfull...');
                      }, 500);
                  }
                  
                });
                
            }else{
                setTimeout(() => {
                  this.loading=false;
                  this.toaster.error('Error:'+res.message);
                  }, 1000);
            }
        });
  }
  onProductImageSelect(event:any,imageSide:string){
    const selectedFile=event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    switch(imageSide){     
     case '1':  this.imageToSend1=event.target.files[0];
                reader.onload = e => this.frontImageName1 = reader.result;this.frontImageName=selectedFile.name;
                this.productService.productForm.get('productDetail.frontImage')?.patchValue(this.frontImageName);
                break;
      case '2': this.imageToSend2=event.target.files[0];
                reader.onload = e => this.frontImageName2 = reader.result;this.backImageName=selectedFile.name;
                this.productService.productForm.get('productDetail.backImage')?.patchValue(this.backImageName);

                break;
      case '3': this.imageToSend3=event.target.files[0];
                reader.onload = e => this.frontImageName3 = reader.result;this.leftImageName=selectedFile.name;
                this.productService.productForm.get('productDetail.leftImage')?.patchValue(this.leftImageName);

                break;
      case '4': this.imageToSend4=event.target.files[0];
                reader.onload = e => this.frontImageName4 = reader.result;this.rightImageName=selectedFile.name;
                this.productService.productForm.get('productDetail.rightImage')?.patchValue(this.rightImageName);

                break;
    }
  }
  getProductImage(imageSide:string){
      if(this.data.isForUpdate){
        var imageUrl='http://localhost:5117/ProductImages/'+this.ProductId+'/';
        var imageName='';
        switch(imageSide){
          case '': imageName='';break;

        }
      }
  }
}
