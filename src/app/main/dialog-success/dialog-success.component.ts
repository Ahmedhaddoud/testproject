import { Component, OnInit ,Inject} from '@angular/core';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogData } from '../dialog/data-dialog';
@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent implements OnInit {

  public message: string;
  constructor( public dialogRef: MatDialogRef<DialogSuccessComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }


  ngOnInit() {
  }

}
