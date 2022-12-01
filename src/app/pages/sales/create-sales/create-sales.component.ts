import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from 'src/app/models/sale';
import { CustomerService } from 'src/services/customer/customer.service';
import { SaleService } from 'src/services/sale/sale.service';

@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.css']
})
export class CreateSalesComponent implements OnInit {
  salesform!:FormGroup
  saleobj!:Sale
  newsalecreated!:Sale
  customername!:string
  customers!:any[]
  constructor(private saleService:SaleService, private formBuilder: FormBuilder,private customerService:CustomerService) { 
    this.saleobj = {} as Sale
    this.newsalecreated = {} as Sale
  }

  ngOnInit() {
    this.salesform = this.formBuilder.group({
      name:['',Validators.required],
      customername:['',Validators.required],
      date:['',Validators.required],
      import:['',Validators.required]
     })

     this.getAllCustomers() 
  }

  RegisterSales(){
    console.log(this.saleobj)
    this.customername = this.salesform.controls['customername'].value 
    console.log(this.customername)
    this.customerService.getbyName(this.customername).subscribe((responsecustomer:any) =>{
      console.log(responsecustomer.content)
      console.log(responsecustomer.content[0])
      this.saleService.create(1,responsecustomer.content[0].id,this.saleobj).subscribe((response:any)=>{
        console.log(response)
        this.newsalecreated = response
      })
    })
   
  }

  getAllCustomers(){
    this.customerService.getAll().subscribe((response:any)=>{
      console.log(response.content)
      this.customers = response.content
    })
  }
  

}
