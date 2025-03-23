import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../../mat-confirm-dialog/mat-confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class ConfirmDiaogService {

  constructor(private dialog:MatDialog) { }
  openConfirmDialog(content:string){
    return this.dialog.open(MatConfirmDialogComponent,{
      width:'390px',
      
      disableClose:true,
      data:{
        contentMsg:content
      }
    })
  }
}
