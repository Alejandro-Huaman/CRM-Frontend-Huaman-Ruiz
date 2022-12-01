import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from 'src/services/sale/sale.service';
import { CreateSalesComponent } from './create-sales/create-sales.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  list:number[] = [1,2,3,4,5]
  dataSource!:MatTableDataSource<any>;
  
  constructor(public dialog:MatDialog,private saleService:SaleService) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.GetAllSales()
  }

  OpenCreateSales(){
    const dialogsale = this.dialog.open(CreateSalesComponent)

    dialogsale.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.dataSource.data.push({...result})
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.GetAllSales() 
    }) 
  }

  GetAllSales(){
    this.saleService.getAll().subscribe((response:any)=>{
      this.dataSource.data = response.content
      console.log(this.dataSource.data)
    })
  }
}
