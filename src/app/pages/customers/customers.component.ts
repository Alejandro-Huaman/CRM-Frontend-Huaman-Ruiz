import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/services/customer/customer.service';
import { CreateCustomersComponent } from './create-customers/create-customers.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['Razon Social', 'Ruc', 'Ventas del mes', 'Ventas del año'];
  dataSource!:MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator 
  
  constructor(public dialog:MatDialog, private customerService: CustomerService) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.GetAllCustomers()
  }

  OpenCreateCustomer(){
    const dialogcustomer = this.dialog.open(CreateCustomersComponent)

    dialogcustomer.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.dataSource.data.push({...result})
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.GetAllCustomers() 
    })        
  }

  GetAllCustomers(){
    this.customerService.getAll().subscribe((response:any)=>{
      this.dataSource.data = response.content
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    })
  }

}