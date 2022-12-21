import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { SaleService } from 'src/services/sale/sale.service';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/services/task/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../dialog-answer-messages/create-task-dialog/create-task-dialog.component';
import { EmailService } from 'src/services/email/email.service';

@Component({
  selector: 'app-inside-sale',
  templateUrl: './inside-sale.component.html',
  styleUrls: ['./inside-sale.component.css']
})
export class InsideSaleComponent implements OnInit {
  hours:string[] = []
  templatehour:string = ":00"
  whois!:string
  saleidurl!:number
  objectsale!:Sale
  salesdate!:any
  pipedate:DatePipe = new DatePipe("en-US")
  datenow = new Date()
  emailform!:FormGroup
  appointmentform!:FormGroup
  taskform!:FormGroup
  objemailtask!:Task
  objappointtask!:Task
  objtask!:Task
  createtaskdate!:any
  createsaledate!:any
  salestatus!:string
  dataSource!:MatTableDataSource<any>;
  dataSource2!:MatTableDataSource<any>;
  constructor(private ActivateRoute:ActivatedRoute, private saleService:SaleService, private formBuilder: FormBuilder, private taskService:TaskService, public dialog:MatDialog,
    private emailService:EmailService) {

    this.objectsale = {} as Sale
    this.objemailtask = {} as Task
    this.objappointtask = {} as Task
    this.objtask = {} as Task
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.emailform = this.formBuilder.group({
      description:[''],
      title:['',Validators.required],
    })

    this.appointmentform = this.formBuilder.group({
      appointdescription:[''],
      appointtitle:['',Validators.required],
      appointdate:['',Validators.required],
      appointinithour:['',Validators.required],
      appointfinalhour:['',Validators.required],
    })

    this.taskform = this.formBuilder.group({
      taskdescription:[''],
      tasktitle:['',Validators.required],
      taskdate:['',Validators.required],
    })

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('saleid')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.saleidurl= pod;

    console.log(this.whois)
    console.log(this.saleidurl)

    for(let i=1;i<25;i++){
      this.templatehour = String(i) + this.templatehour;        
      this.hours.push(this.templatehour)
      this.templatehour = ":00"    
    }

    this.GetSaleById(this.saleidurl)
    this.GetFinalTask(this.saleidurl)
  }

  GetSaleById(saleid:number){
    this.saleService.getbyId(saleid).subscribe((response:any) =>{
      this.objectsale = response
      this.salesdate = this.pipedate.transform(this.objectsale.finishdate, 'dd/MM/yyyy');
      console.log(typeof this.salesdate)
      console.log(this.salesdate)

      if(this.objectsale.statusname == "Qualification"){
        this.salestatus = "Propuesta inicial" 
      }else if(this.objectsale.statusname == "Need_Analysis"){
        this.salestatus = "Evaluación tecnica"
      }else if(this.objectsale.statusname == "Proposal"){
        this.salestatus = "Evaluación comercial"
      }else if(this.objectsale.statusname == "Negotiation"){
        this.salestatus = "Cerrada (OC)"
      }else if(this.objectsale.statusname == "Closed_Won"){
        this.salestatus = "Perdida - Desestimada"
      }

      console.log(this.objectsale)

      this.createsaledate = this.pipedate.transform(this.objectsale.created_at, 'dd/MM/yyyy');
      
      console.log("Fecha de creacion de venta")
      console.log(this.createsaledate)
    });
  }

  ClearEmailInputs(){
    this.emailform.patchValue({
      description:'',
      title:''
    })
  }

  CreateEmail(){
    this.objemailtask.date = new Date()
    console.log(this.objemailtask)
    this.taskService.create(this.saleidurl,this.objemailtask).subscribe((response:any) =>{
      console.log(response)
      this.dataSource.data.push({...response})
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      
      this.emailService.sendEmail(this.objectsale.customer.email,response.title,response.description).subscribe((response:any)=>{
        this.dialog.open(CreateTaskDialogComponent)
      },err=>{
        alert("No existe el correo electronico por favor editar el correo del cliente")
      });

    });
  }

  ClearAppointForm(){
    this.appointmentform.patchValue({
      appointdescription:'',
      appointtitle:'',
      appointdate:'',
      appointinithour:'',
      appointfinalhour:''
    })
  }

  CreateAppoint(){
    console.log(this.objappointtask)
    this.taskService.create(this.saleidurl,this.objappointtask).subscribe((response:any) =>{
      this.dataSource.data.push({...response})
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.dialog.open(CreateTaskDialogComponent)
    });
  }

  ClearTaskForm(){
    this.taskform.patchValue({
      taskdescription:'',
      tasktitle:'',
      taskdate:'',
    })
  }

  CreateTask(){
    console.log(this.objtask)
    this.taskService.create(this.saleidurl,this.objtask).subscribe((response:any) =>{
      this.dataSource.data.push({...response})
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.dialog.open(CreateTaskDialogComponent)
    });
  }

  GetFinalTask(saleid:number){
    this.taskService.getbySaleId(saleid).subscribe((response:any) =>{
      this.dataSource2.data = response.content

      console.log(this.dataSource2.data)
      console.log(this.dataSource2.data.length)

      let finalposition = this.dataSource2.data.length-1
      this.taskService.getbyId(this.dataSource2.data[finalposition].id).subscribe((response:any) =>{
        console.log(response.created_at) 
        this.createtaskdate = this.pipedate.transform(response.created_at, 'dd/MM/yyyy');

        console.log("Fecha de creacion de la ultima actividad")
        console.log(this.createtaskdate)
      });

    });
    
  }
}
