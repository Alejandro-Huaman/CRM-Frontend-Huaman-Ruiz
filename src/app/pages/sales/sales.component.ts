import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
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
  datanull:any[] = []
  yearmonthform!:FormGroup
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
  month!:any
  year!:any
  pipedate:DatePipe = new DatePipe("en-US")
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
    this.yearmonthform = this.formBuilder.group({
      year:[''],
      month:['']
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

    if(value == "Iniciada"){
      
      this.newstatus.statusname = "Qualification"

      console.log(this.newstatus)
      
      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        this.GetSalesQualification()  
        this.GetSalesProposal()  
        this.GetSalesNegotiation()  
        this.GetSalesNeed_Analysis()  
        this.GetSalesClosed_Won()  
      });

    }else if(value == "Propuesta Inicial"){
      
      this.newstatus.statusname = "Need_Analysis"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        this.GetSalesQualification()  
        this.GetSalesProposal()  
        this.GetSalesNegotiation()  
        this.GetSalesNeed_Analysis()  
        this.GetSalesClosed_Won()  
      });

    }else if(value == "Presupuesto"){
      
      this.newstatus.statusname = "Proposal"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)
        this.GetSalesQualification()  
        this.GetSalesProposal()  
        this.GetSalesNegotiation()  
        this.GetSalesNeed_Analysis()  
        this.GetSalesClosed_Won()  
      });

    }else if(value == "Negociación"){
      
      this.newstatus.statusname = "Negotiation"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname) 
        this.GetSalesQualification()  
        this.GetSalesProposal()  
        this.GetSalesNegotiation()  
        this.GetSalesNeed_Analysis()  
        this.GetSalesClosed_Won()  
      });

    }else if(value == "Cerrada"){
      
      this.newstatus.statusname = "Closed_Won"

      console.log(this.newstatus)

      this.saleService.updateStatus(saleid,this.newstatus).subscribe((response:any) =>{
        console.log(response.statusname)  
        this.GetSalesQualification()  
        this.GetSalesProposal()  
        this.GetSalesNegotiation()  
        this.GetSalesNeed_Analysis()  
        this.GetSalesClosed_Won()
      });

    }

    this.statusform.patchValue({
      status:''
    })
  }

  RealizarFiltro(){
    this.month = this.yearmonthform.controls['month'].value
    this.year = this.yearmonthform.controls['year'].value
    console.log(this.month)
    console.log(this.year)

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

  }

}
