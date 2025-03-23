import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './Product/product-dashboard/product-dashboard.component';
import { OrderDashboardComponent } from './Order/order-dashboard/order-dashboard.component';
import { DeliveryDashboardComponent } from './Delivery/delivery-dashboard/delivery-dashboard.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent,
   children:[
    {path:'userDashboard',component:UserDashboardComponent,outlet:'adminOutlet'},
    {path:'productDashboard',component:ProductDashboardComponent,outlet:'adminOutlet'},
    {path:'orderDashboard',component:OrderDashboardComponent,outlet:'adminOutlet'},
    {path:'deliveryDashboard',component:DeliveryDashboardComponent,outlet:'adminOutlet'},

   ]
    
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
