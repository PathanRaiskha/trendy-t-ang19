import { Component, inject } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../shared/models/ApiResponse';
import { catchError, throwError } from 'rxjs';
import { AppSettingsService } from '../../../shared/services/app-settings.service';
import { OrderServiceService } from '../../../shared/services/order-service.service';



@Component({
  standalone: false,
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent {
  constructor() {

  }

   OrderService=inject(OrderServiceService)
   appSettings=inject(AppSettingsService)  ; 

   
  loading: boolean = false;
  totalRecords = 0;
  pageSize = 5;
  pageIndex = 0;
  dataSource: any;
  sortOnColumn: string = '';
  sortDirection: boolean = true;
  orderlist: Order[] = [];
  serchTerm: string = '';
  public displayedColumns: string[] = ['Id', 'Status', 'TotalBill', 'OrderDate', 'OrderStatusChangedDate'];


  ngOnInit() {
    // this.getAllUsersPagedAsync(0, this.sortOnColumn, this.sortDirection);
    this. getAllUsers();
  }

  getAllUsers(){
   
     this.OrderService.getAllUsers().subscribe(res =>{
      if (res.isSuccess){
        this.loading = true;
        this.dataSource=res.result;
      }
    }
  );
  

  }

  // getAllUsersPagedAsync(pgIndex: number, orderBy: string, orderByAsc: boolean) {
  //   this.loading = true;
  //   this.secoundgetAllUsersPagedAsync(pgIndex, this.pageSize, orderBy, orderByAsc, this.serchTerm).subscribe(res => {
  //     if (res.isSuccess) {
  //       this.orderlist = res.result;
  //       this.totalRecords = Number(res.message);
  //       this.pageIndex = pgIndex;
  //       this.sortOnColumn = orderBy;
  //       this.sortDirection = orderByAsc;
  //       this.dataSource = new MatTableDataSource<Order>(this.orderlist);
  //       setTimeout(() => {
  //         this.loading = false;
  //       }, 700);
  //     }
  //   });
  // }


  //  secoundgetAllUsersPagedAsync(pageIndex:number,pageSize:number,orderBy:string,orderByAsc:boolean,searchTerm:string){
  //     return  this._http.get<ApiResponse>(this.GetAppSettings().apiUrl+'User/GetOrderPaged?pageIndex='+pageIndex+'&pageSize='+pageSize+'&orderBy='+orderBy+'&orderByAsc='+orderByAsc+'&searchTerm='+searchTerm)
  //     .pipe(      catchError(this.handleError));
  
  //   }



   
    
}
