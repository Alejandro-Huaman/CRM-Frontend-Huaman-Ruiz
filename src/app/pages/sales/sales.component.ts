import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  whois!:string
  idurl!:number
  months:string[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  lotstatus:string[] = ["Iniciada","Propuesta Inicial","Presupuesto","Negociación","Cerrada"]
  statusform!:FormGroup

  constructor(public dialog:MatDialog,private saleService:SaleService,private cd:Router,private ActivateRoute:ActivatedRoute,private formBuilder: FormBuilder) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.statusform = this.formBuilder.group({
      status:[''],
    })

    this.statusform.controls['status'].setValue("Hola");

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl= pod;

    console.log(this.whois)
    console.log(this.idurl)


    this.GetAllSales()
  }

  OpenCreateSales(){
    const dialogsale = this.dialog.open(CreateSalesComponent,{
      data: this.idurl       
    })

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

  GoToInsideSale(id:number){
    console.log(id)
    
    this.cd.navigate([this.whois,this.idurl,"Sales",id,"inside-sale"])

  }
}
