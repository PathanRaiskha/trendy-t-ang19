import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatDialogConfig,MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Product } from '../../../shared/models/product';
import { ConfirmDiaogService } from '../../../shared/services/confirm-diaog.service';
import { ProductService } from '../../../shared/services/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
@Component({
  standalone:false,
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent {

    loading:boolean=false;
    productList!: Product[];
    totalRecords = 0;
    pageSize = 5;
    pageIndex = 0;
    dataSource:any;
    sortOnColumn:string='';
    sortDirection:boolean=true;
    serchTerm:string='';
    //columnsList:string []=["Name","Email","Mobile","Gender","Address","Actions"];
    columnsList:string []=["Name","Description","Price","Quantity","action"];

  constructor(
   
    private confirmDiaog:ConfirmDiaogService,
    private dialog:MatDialog,
    public productService:ProductService,
    private toaster: ToastrService
    ){
  }
  ngOnInit(){
    this.getAllProductsPagedAsync(0,this.sortOnColumn,this.sortDirection);
    
  }
  getAllProducts(){
    this.productService.getAllProducts().subscribe(res=>{
      if(res.isSuccess){
          this.productList=res.result;
          console.log(this.productList);
          this.dataSource=new MatTableDataSource<Product>(this.productList);

      }
    });
}
getAllProductsPagedAsync(pgIndex:number,orderBy:string,orderByAsc:boolean){
  this.loading=true;
  this.productService.getAllProductsPagedAsync(pgIndex,this.pageSize,orderBy,orderByAsc,this.serchTerm).subscribe(res=>{
    if(res.isSuccess){
        this.productList=res.result;
        this.totalRecords=Number(res.message);
        this.pageIndex=pgIndex;
        this.sortOnColumn=orderBy;
        this.sortDirection=orderByAsc;
        this.dataSource=new MatTableDataSource<Product>(this.productList);
        setTimeout(() => {
            this.loading=false;            
        }, 700);
    }
  });
}

  sortData(sortData:Sort){
    this.pageIndex=0;
    let dir=true;
    console.log(sortData);
    switch(sortData.direction.toString())
    {
          case 'asc': dir=true;break;
          case 'desc': dir=false;break;
          default:dir=!this.sortDirection; 

    }
  this.getAllProductsPagedAsync(this.pageIndex,sortData.active,dir);
  }
  searchInTable(){
    this.getAllProductsPagedAsync(this.pageIndex,this.sortOnColumn,this.sortDirection);
  }

  handlePageEvent(e: PageEvent) {
    this.getAllProductsPagedAsync(e.pageIndex,this.sortOnColumn,this.sortDirection);
  }
  addNewProduct(){
      this.dialog.open(ProductDetailComponent,{
        width:'790px',  
         height:'1000px'     ,
        // minHeight:'475px',
        disableClose:true,
        data:{
          isForUpdate:false
        }
      }).afterClosed().subscribe(res=>{
            if(res==false){
              this.productService.productForm.reset();
              //Load products 
            }
      });
  }
  onProductDelete(userId:any){
    this.confirmDiaog.openConfirmDialog('Are you sure, You want to delete this record?').afterClosed().subscribe(res=>{
      if(res){
          this.productService.deleteProduct(userId).subscribe(res=>{
            if(res.isSuccess){
                  this.toaster.success('Record deleted successfully...');
                  this.getAllProductsPagedAsync(0,this.sortOnColumn,this.sortDirection);

            }
          });
      }
    });
  }
  onProductUpdate(row:any){
    
    this.productService.productForm.patchValue({$Id:row.id,name:row.name,description:row.description,price:row.price,quantity:row.quantity,isCustomizable:row.isCustomizable})
    this.productService.productForm.get('productDetail.isFullSleeve')?.patchValue(row.productDetail.isFullSleeve)
    this.productService.productForm.get('productDetail.color')?.patchValue(row.productDetail.color)
    this.productService.productForm.get('productDetail.material')?.patchValue(row.productDetail.material)
    this.productService.productForm.get('productDetail.neckType')?.patchValue(row.productDetail.neckType)
    this.productService.productForm.get('productDetail.size')?.patchValue(row.productDetail.size)
    
    
    const dialogConfig=new MatDialogConfig()
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="50%";
     dialogConfig.height="90%";
     dialogConfig.data={
      isForUpdate:true
    }
     this.dialog.open(ProductDetailComponent,dialogConfig).afterClosed().subscribe(res=>{
       if(res==false){
         this.getAllProductsPagedAsync(0,this.sortOnColumn,this.sortDirection);
 
       }
     });
  
    
   }
   


}
