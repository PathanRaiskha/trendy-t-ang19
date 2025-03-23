import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './Product/product-dashboard/product-dashboard.component';
import { OrderDashboardComponent } from './Order/order-dashboard/order-dashboard.component';
import { DeliveryDashboardComponent } from './Delivery/delivery-dashboard/delivery-dashboard.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    ProductDashboardComponent,
    OrderDashboardComponent,
    DeliveryDashboardComponent,
    EditUserComponent,
    ProductDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ]
})
export class AdminModule { }
