import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
// import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
const arr=[
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRadioModule,  
  MatTabsModule
  ,MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  MatRippleModule,
  MatGridListModule,
  MatDialogModule,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    arr,
    
  ],
  exports:[
    arr,
    ]
})
export class MaterialModule { }
