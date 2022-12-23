import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SaleService } from 'src/services/sale/sale.service';
import { UserService } from 'src/services/user/user.service';
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
  datanull:any[] = []
  yearmonthform!:FormGroup
  typeusersaleform!:FormGroup
  dataSource!:MatTableDataSource<any>;
  dataSource2!:MatTableDataSource<any>;
  dataSource3!:MatTableDataSource<any>;
  dataSource4!:MatTableDataSource<any>;
  dataSource5!:MatTableDataSource<any>;
  dataSource6!:MatTableDataSource<any>;
  filterdataSource2:any[] = []
  filterdataSource3:any[] = []
  filterdataSource4:any[] = []
  filterdataSource5:any[] = []
  filterdataSource6:any[] = []
  filteruserdataSource2:any[] = []
  filteruserdataSource3:any[] = []
  filteruserdataSource4:any[] = []
  filteruserdataSource5:any[] = []
  filteruserdataSource6:any[] = []
  month!:any
  year!:any
  assistant!:any
  userurlobject!:User
  pipedate:DatePipe = new DatePipe("en-US")
  whois!:string
  idurl!:number
  users:string[] = []
  months:string[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  lotstatus:string[] = ["Propuesta Inicial","Evaluación tecnica","Evaluación comercial","Cerrada (OC)","Perdida - Desestimada"]
  statusform!:FormGroup
  newstatus!:Selectedstatus
  constructor(public dialog:MatDialog,private saleService:SaleService,private cd:Router,private ActivateRoute:ActivatedRoute,private formBuilder: FormBuilder,private userService:UserService) { 
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.dataSource3 = new MatTableDataSource<any>();
    this.dataSource4 = new MatTableDataSource<any>();
    this.dataSource5 = new MatTableDataSource<any>();
    this.dataSource6 = new MatTableDataSource<any>();
    this.newstatus = {} as Selectedstatus
    this.userurlobject = {} as User
  }

  ngOnInit() {
    this.statusform = this.formBuilder.group({
      status:[''],
    })
    this.yearmonthform = this.formBuilder.group({
      year:[''],
      month:['']
    })
    this.typeusersaleform = this.formBuilder.group({
      typeuser:[''],
    })


    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl= pod;

    console.log(this.whois)
    console.log(this.idurl)
    
    this.GetUserSaleManager()
    this.GetAllSalesAsisstants()

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
      this.dataSource2.data.push({...result})
      this.dataSource2.data = this.dataSource2.data.map((o: any) => { return o; });
      this.GetSalesQualification()     
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

    if(value == "Propuesta Inicial"){
      
      this.newstatus.statusname = "Qualification"

      console.log(this.newstatus)
      
      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        if(this.userurlobject.typeusersale != "Jefe de ventas"){
          
          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }

        }else{

          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.RealizarFiltro()
          }else if(this.typeusersaleform.controls['typeuser'].value != "" && this.yearmonthform.controls['month'].value == "" || this.yearmonthform.controls['year'].value == ""){
            this.RealizarFiltroVenta()
          }else if(this.typeusersaleform.controls['typeuser'].value != "" && this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltroSaleMonthYear()
          }

        }
          
      });

    }else if(value == "Evaluación tecnica"){
      
      this.newstatus.statusname = "Need_Analysis"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        if(this.userurlobject.typeusersale != "Jefe de ventas"){
          
          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }

        }else{

          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }else if(this.typeusersaleform.controls['typeuser'].value != ""){
            this.RealizarFiltroVenta()
          }

        }
      });

    }else if(value == "Evaluación comercial"){
      
      this.newstatus.statusname = "Proposal"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        if(this.userurlobject.typeusersale != "Jefe de ventas"){
          
          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }

        }else{

          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }else if(this.typeusersaleform.controls['typeuser'].value != ""){
            this.RealizarFiltroVenta()
          }

        } 
      });

    }else if(value == "Cerrada (OC)"){
      
      this.newstatus.statusname = "Negotiation"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname) 
        if(this.userurlobject.typeusersale != "Jefe de ventas"){
          
          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }

        }else{

          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }else if(this.typeusersaleform.controls['typeuser'].value != ""){
            this.RealizarFiltroVenta()
          }

        }
      });

    }else if(value == "Perdida - Desestimada"){
      
      this.newstatus.statusname = "Closed_Won"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)  
        if(this.userurlobject.typeusersale != "Jefe de ventas"){
          
          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }

        }else{

          if(this.yearmonthform.controls['month'].value == "" && this.yearmonthform.controls['year'].value == "" && this.typeusersaleform.controls['typeuser'].value == ""){
            this.GetSalesQualification()  
            this.GetSalesProposal()  
            this.GetSalesNegotiation()  
            this.GetSalesNeed_Analysis()  
            this.GetSalesClosed_Won()
          }else if(this.yearmonthform.controls['month'].value != "" || this.yearmonthform.controls['year'].value != ""){
            this.RealizarFiltro()
          }else if(this.typeusersaleform.controls['typeuser'].value != ""){
            this.RealizarFiltroVenta()
          }

        }
      });

    }

    this.statusform.patchValue({
      status:''
    })
  }

  RealizarFiltro(){
    this.month = this.yearmonthform.controls['month'].value
    this.year = this.yearmonthform.controls['year'].value
    this.assistant = this.typeusersaleform.controls['typeuser'].value
    console.log(this.month)
    console.log(this.year)
    console.log(this.assistant)

    if(this.userurlobject.typeusersale != "Jefe de ventas"){

      if(this.month != "" && this.year != ""){
      
        if(this.month == "Enero"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Enero')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Febrero"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Febrero')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Marzo"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Marzo')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Abril"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Abril')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Mayo"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Mayo')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Junio"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Junio')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Julio"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Julio')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Agosto"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Agosto')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Septiembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Septiembre')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Octubre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Octubre')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Noviembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Noviembre')+1,this.year).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        if(this.month == "Diciembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Diciembre')+1,this.year).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
                  console.log(oneobject.statusname)
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        
      }
  
      if(this.month != "" && this.year == ""){
        
        if(this.month == "Enero"){
          this.saleService.getSaleByMonth(this.months.indexOf('Enero')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Febrero"){
          this.saleService.getSaleByMonth(this.months.indexOf('Febrero')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Marzo"){
          this.saleService.getSaleByMonth(this.months.indexOf('Marzo')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Abril"){
          this.saleService.getSaleByMonth(this.months.indexOf('Abril')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Mayo"){
          this.saleService.getSaleByMonth(this.months.indexOf('Mayo')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Junio"){
          this.saleService.getSaleByMonth(this.months.indexOf('Junio')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Julio"){
          this.saleService.getSaleByMonth(this.months.indexOf('Julio')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Agosto"){
          this.saleService.getSaleByMonth(this.months.indexOf('Agosto')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Septiembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Septiembre')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Octubre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Octubre')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Noviembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Noviembre')+1).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        if(this.month == "Diciembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Diciembre')+1).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
                  console.log(oneobject.statusname)
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
  
      }
  
      if(this.year != "" && this.month == ""){
  
          this.saleService.getSaleByYear(this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
  
      }
    } else{
      
      if(this.month != "" && this.year != "" && this.assistant == ""){
      
        if(this.month == "Enero"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Enero')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Febrero"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Febrero')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Marzo"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Marzo')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Abril"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Abril')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Mayo"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Mayo')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Junio"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Junio')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Julio"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Julio')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Agosto"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Agosto')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Septiembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Septiembre')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Octubre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Octubre')+1,this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Noviembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Noviembre')+1,this.year).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        if(this.month == "Diciembre"){
          this.saleService.getSaleByMonthAndYear(this.months.indexOf('Diciembre')+1,this.year).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
                  console.log(oneobject.statusname)
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        
      }
  
      if(this.month != "" && this.year == "" && this.assistant == ""){
        
        if(this.month == "Enero"){
          this.saleService.getSaleByMonth(this.months.indexOf('Enero')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Febrero"){
          this.saleService.getSaleByMonth(this.months.indexOf('Febrero')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Marzo"){
          this.saleService.getSaleByMonth(this.months.indexOf('Marzo')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Abril"){
          this.saleService.getSaleByMonth(this.months.indexOf('Abril')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Mayo"){
          this.saleService.getSaleByMonth(this.months.indexOf('Mayo')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Junio"){
          this.saleService.getSaleByMonth(this.months.indexOf('Junio')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Julio"){
          this.saleService.getSaleByMonth(this.months.indexOf('Julio')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Agosto"){
          this.saleService.getSaleByMonth(this.months.indexOf('Agosto')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Septiembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Septiembre')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Octubre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Octubre')+1).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
        }
        if(this.month == "Noviembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Noviembre')+1).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
        if(this.month == "Diciembre"){
          this.saleService.getSaleByMonth(this.months.indexOf('Diciembre')+1).subscribe((response:any)=>{
              
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
                  console.log(oneobject.statusname)
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  } 
                  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
                  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
          }); 
        }
  
      }
  
      if(this.year != "" && this.month == "" && this.assistant == ""){
  
          this.saleService.getSaleByYear(this.year).subscribe((response:any)=>{
  
              this.filterdataSource2 = []
              this.filterdataSource3 = []
              this.filterdataSource4 = []
              this.filterdataSource5 = []
              this.filterdataSource6 = []
  
              for(let oneobject of response.content){
  
                  if(oneobject.statusname == "Qualification"){
                    this.filterdataSource2.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Need_Analysis"){
                    this.filterdataSource3.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Proposal"){
                    this.filterdataSource4.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Negotiation"){
                    this.filterdataSource5.push(oneobject)
                  }
  
                  if(oneobject.statusname == "Closed_Won"){
                    this.filterdataSource6.push(oneobject)
                  }
  
              }
  
              console.log("Qualification datos")
              this.dataSource2.data = this.filterdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filterdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filterdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filterdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filterdataSource6
              console.log(this.dataSource6.data)
  
          }); 
  
      }
      
      if(this.year != "" && this.month != "" && this.assistant != ""){
        this.RealizarFiltroSaleMonthYear()
      }

    }
    
  }

  RealizarFiltroVenta(){
    this.assistant = this.typeusersaleform.controls['typeuser'].value
    console.log(this.assistant)
    this.userService.getAll().subscribe((response:any) =>{
      for(let oneuser of response.content){
        if(oneuser.name == this.assistant && oneuser.typeusersale == "Asesor de ventas"){
            this.saleService.getbyUserId(oneuser.id).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
        }
      }
    });
  }

  GetAllSalesAsisstants(){
    this.userService.getAll().subscribe((response:any)=>{
      for(let oneuser of response.content){
        if(oneuser.typeusersale == "Asesor de ventas"){
          this.users.push(oneuser.name)
        }
      }
    });
  }

  GetUserSaleManager(){
    this.userService.getbyId(this.idurl).subscribe((response:any) =>{
      this.userurlobject = response
    });
  }

  RealizarFiltroSaleMonthYear(){
    this.assistant = this.typeusersaleform.controls['typeuser'].value
    this.month = this.yearmonthform.controls['month'].value
    this.year = this.yearmonthform.controls['year'].value
    console.log(this.month)
    console.log(this.year)
    console.log(this.assistant)
    this.userService.getAll().subscribe((response:any) =>{
      for(let oneuser of response.content){

        if(oneuser.name == this.assistant && oneuser.typeusersale == "Asesor de ventas"){
          
          if(this.month == "Enero"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Enero')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Febrero"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Febrero')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Marzo"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Marzo')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Abril"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Abril')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Mayo"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Mayo')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Junio"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Junio')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Julio"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Julio')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Agosto"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Agosto')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Septiembre"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Septiembre')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Octubre"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Octubre')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Noviembre"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Noviembre')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
          if(this.month == "Diciembre"){
            this.saleService.getSaleByUserIdAndMonthAndYear(oneuser.id,this.months.indexOf('Diciembre')+1,this.year).subscribe((response:any)=>{
              this.filteruserdataSource2 = []
              this.filteruserdataSource3 = []
              this.filteruserdataSource4 = []
              this.filteruserdataSource5 = []
              this.filteruserdataSource6 = []

              for(let oneobject of response.content){

                if(oneobject.statusname == "Qualification"){
                  this.filteruserdataSource2.push(oneobject)
                }

                if(oneobject.statusname == "Need_Analysis"){
                  this.filteruserdataSource3.push(oneobject)
                }

                if(oneobject.statusname == "Proposal"){
                  this.filteruserdataSource4.push(oneobject)
                }

                if(oneobject.statusname == "Negotiation"){
                  this.filteruserdataSource5.push(oneobject)
                }

                if(oneobject.statusname == "Closed_Won"){
                  this.filteruserdataSource6.push(oneobject)
                }

              }

              console.log("Qualification datos")
              this.dataSource2.data = this.filteruserdataSource2
              console.log(this.dataSource2.data)
              console.log("Need_Analysis datos")
              this.dataSource3.data = this.filteruserdataSource3
              console.log(this.dataSource3.data)
              console.log("Proposal datos")
              this.dataSource4.data = this.filteruserdataSource4
              console.log(this.dataSource4.data)
              console.log("Negotiation datos")
              this.dataSource5.data = this.filteruserdataSource5
              console.log(this.dataSource5.data)
              console.log("Closed_Won datos")
              this.dataSource6.data = this.filteruserdataSource6
              console.log(this.dataSource6.data)

            });
          }
            
        }
      }
    });
  }

}
