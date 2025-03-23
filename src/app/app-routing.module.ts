import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login-Register/login/login.component';
import { SignUpComponent } from './Login-Register/sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  // {path:'home',component:HomeComponent},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
