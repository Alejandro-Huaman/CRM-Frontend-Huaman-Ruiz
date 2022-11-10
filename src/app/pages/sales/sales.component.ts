import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSalesComponent } from './create-sales/create-sales.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  list:number[] = [1,2,3,4,5]
  
  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  OpenCreateSales(){
    this.dialog.open(CreateSalesComponent)
  }
}
