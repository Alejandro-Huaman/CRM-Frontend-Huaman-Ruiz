import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/services/customer/customer.service';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.css']
})
export class CreateCustomersComponent implements OnInit {
  customerform!:FormGroup
  customerobj!:Customer
  newcustomercreated!:Customer
  constructor(private customerService:CustomerService, private formBuilder: FormBuilder) { 
    this.newcustomercreated = {} as Customer
    this.customerobj = {} as Customer
  }

  ngOnInit() {
    this.customerform = this.formBuilder.group({
      name:['',Validators.required],
      businessname:['',Validators.required],
      ruc:['',Validators.required],
      fiscaladdress:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
     })
  }

  RegisterCustomer(){
    console.log(this.customerobj)
    this.customerService.create(this.customerobj).subscribe((response:any)=>{
      this.newcustomercreated = response
    })
  }

}
