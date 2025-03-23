import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFooterComponent } from './components/my-footer/my-footer.component';






@NgModule({
  declarations: [
    MyFooterComponent
  ],
  imports: [
    
    CommonModule
  ],
  exports:[
    MyFooterComponent
  ]
})
export class FooterModule { }
