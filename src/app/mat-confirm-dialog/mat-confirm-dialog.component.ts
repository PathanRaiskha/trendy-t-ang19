import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  standalone:false,
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {contentMsg: string}){

    }
}
