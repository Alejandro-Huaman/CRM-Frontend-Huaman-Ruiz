import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  customerbusiness!:string
  customers!:any[]
  datenow = new Date()

  constructor(private saleService:SaleService, private formBuilder: FormBuilder,private customerService:CustomerService, private ActivateRoute:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public idurl:any) { 
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
     console.log(this.idurl)
     this.getAllCustomers() 
  }

  RegisterSales(){
    console.log(this.saleobj)
    this.customerbusiness = this.salesform.controls['customername'].value 
    console.log(this.customerbusiness)
    this.customerService.getbyBusinessName(this.customerbusiness).subscribe((responsecustomer:any) =>{
      console.log(responsecustomer)

      this.saleService.create(this.idurl,responsecustomer.id,this.saleobj).subscribe((response:any)=>{
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
