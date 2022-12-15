import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/services/customer/customer.service';
import { SaleService } from 'src/services/sale/sale.service';
import { CreateCustomersComponent } from './create-customers/create-customers.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['nombre','Razon Social', 'Ruc', 'Ventas'];
  dataSource!:MatTableDataSource<any>;
  numbersale!:any
  cont:number = 0
  
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator 
  
  constructor(public dialog:MatDialog, private customerService: CustomerService,private saleService:SaleService) { 
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.GetAllCustomers() 
    })        
  }

  GetAllCustomers(){
    this.customerService.getAll().subscribe((response:any)=>{
      this.dataSource.data = response.content
      this.dataSource.paginator = this.paginator;

      for(let onecustomer of this.dataSource.data){
        
        this.saleService.getNumberofSaleByCustomerId(onecustomer.id).subscribe((response:any) =>{
          console.log(response)
          onecustomer.numbersales = response
        });
        
      }
      
      console.log(this.dataSource.data)
    })
  } 

}