import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from 'src/services/sale/sale.service';
import { CreateSalesComponent } from './create-sales/create-sales.component';

export interface Selectedstatus{
  statusname:string
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  list:number[] = [1,2,3,4,5]
  dataSource!:MatTableDataSource<any>;
  dataSource2!:MatTableDataSource<any>;
  dataSource3!:MatTableDataSource<any>;
  dataSource4!:MatTableDataSource<any>;
  dataSource5!:MatTableDataSource<any>;
  dataSource6!:MatTableDataSource<any>;
  whois!:string
  idurl!:number
  months:string[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  lotstatus:string[] = ["Iniciada","Propuesta Inicial","Presupuesto","Negociación","Cerrada"]
  statusform!:FormGroup
  newstatus!:Selectedstatus
  constructor(public dialog:MatDialog,private saleService:SaleService,private cd:Router,private ActivateRoute:ActivatedRoute,private formBuilder: FormBuilder) { 
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.dataSource3 = new MatTableDataSource<any>();
    this.dataSource4 = new MatTableDataSource<any>();
    this.dataSource5 = new MatTableDataSource<any>();
    this.dataSource6 = new MatTableDataSource<any>();
    this.newstatus = {} as Selectedstatus
  }

  ngOnInit() {
    this.statusform = this.formBuilder.group({
      status:[''],
    })

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl= pod;

    console.log(this.whois)
    console.log(this.idurl)
    
    this.GetSalesQualification()  
    this.GetSalesProposal()  
    this.GetSalesNegotiation()  
    this.GetSalesNeed_Analysis()  
    this.GetSalesClosed_Won()  
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

  GetSalesQualification(){
    this.saleService.getbyStatusId(1).subscribe((response:any) =>{
      this.dataSource2.data = response.content
      console.log("Ventas con estado Qualification")
      console.log(this.dataSource2.data)
    });
  }

  GetSalesNeed_Analysis(){
    this.saleService.getbyStatusId(2).subscribe((response:any) =>{
      this.dataSource3.data = response.content
      console.log("Ventas con estado Need_Analysis")
      console.log(this.dataSource3.data)
    });
  }

  GetSalesProposal(){
    this.saleService.getbyStatusId(3).subscribe((response:any) =>{
      this.dataSource4.data = response.content
      console.log("Ventas con estado Proposal")
      console.log(this.dataSource4.data)
    });
  }

  GetSalesNegotiation(){
    this.saleService.getbyStatusId(4).subscribe((response:any) =>{
      this.dataSource5.data = response.content
      console.log("Ventas con estado Negotiation")
      console.log(this.dataSource5.data)
    });
  }

  GetSalesClosed_Won(){
    this.saleService.getbyStatusId(5).subscribe((response:any) =>{
      this.dataSource6.data = response.content
      console.log("Ventas con estado Closed_Won")
      console.log(this.dataSource6.data)
    });
  }

  GoToInsideSale(id:number){
    console.log(id)
    
    this.cd.navigate([this.whois,this.idurl,"Sales",id,"inside-sale"])

  }

  Changestatus(value:any,saleid:number){
    console.log(value)
    console.log(saleid)

    if(value == "Iniciada"){
      
      this.newstatus.statusname = "Qualification"

      console.log(this.newstatus)
      
      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
      });

    }else if(value == "Propuesta Inicial"){
      
      this.newstatus.statusname = "Need_Analysis"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
      });

    }else if(value == "Presupuesto"){
      
      this.newstatus.statusname = "Proposal"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
      });

    }else if(value == "Negociación"){
      
      this.newstatus.statusname = "Negotiation"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
      });

    }else if(value == "Cerrada"){
      
      this.newstatus.statusname = "Closed_Won"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
      });

    }

  }
}
