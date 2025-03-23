import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHeaderComponent } from './components/my-header/my-header.component';
import { MaterialModule } from '../material/material.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    MyHeaderComponent
  ],
  imports: [
    
    MatButtonToggleModule,
    CommonModule,
    MaterialModule,
    
  ],
  exports:[
    MyHeaderComponent
  ]
})
export class HeaderModule { }
