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
import { FileService } from 'src/services/file/file.service';
import { saveAs } from 'file-saver';

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
  taskdate!:any
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
  selectedFile!: File;
  FileMin!: File;
  filename!:string
  idurl!:number
  dataSource!:MatTableDataSource<any>;
  dataSource2!:MatTableDataSource<any>;
  constructor(private ActivateRoute:ActivatedRoute, private saleService:SaleService, private formBuilder: FormBuilder, private taskService:TaskService, public dialog:MatDialog,
    private emailService:EmailService,private fileService:FileService) {

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
    let pod2=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.saleidurl= pod;
    this.idurl = pod2

    console.log(this.whois)
    console.log(this.saleidurl)
    console.log(this.idurl)

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

      this.getFileName(this.objectsale)
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

      this.taskdate = this.pipedate.transform(response.date, 'dd-MM-yyyy');
      console.log(this.taskdate)

      this.emailService.sendEmail(this.objectsale.customer.email,"Horario de reunión", `Muy buenas se informa que se va a realizar una reunion para hablar con mas detalle acerca de la cotización (${this.objectsale.name}) en el respectivo horario: ${this.taskdate} entre ${response.inithour} hasta ${response.finalhour}`).subscribe((response:any)=>{
        this.dialog.open(CreateTaskDialogComponent)
      },err=>{
        alert("No existe el correo electronico por favor editar el correo del cliente")
      });

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
      
      this.taskdate = this.pipedate.transform(response.date, 'dd-MM-yyyy');
      console.log(this.taskdate)

      this.emailService.sendEmail(this.objectsale.customer.email,"Actividad con Vida Automation",`Muy buenas se informa acerca de la actividad ${response.title} para la cotización ${this.objectsale.name} que trata de lo siguiente: ${response.description} en la fecha ${this.taskdate}`).subscribe((response:any)=>{
        this.dialog.open(CreateTaskDialogComponent)
      },err=>{
        alert("No existe el correo electronico por favor editar el correo del cliente")
      });
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

  onFileChanged(event:any){
    console.log(event)

    this.selectedFile = event.target.files[0];
    
    console.log(this.selectedFile)
    
    const fr = new FileReader();
    
    fr.onload = (evento: any) => {
      this.FileMin = evento.target.result;
    };

    fr.readAsDataURL(this.selectedFile);
    
    console.log("file")

    this.fileService.getFileByUserIdandSaleId(this.objectsale.user.id,this.objectsale.id).subscribe((response:any)=>{
        if(response.content.length){
          console.log(response.content[0])
          this.fileService.delete(response.content[0].id).subscribe((response:any)=>{
            
            this.fileService.uploadfileforUserandSale(this.selectedFile,this.objectsale.user.id,this.objectsale.id).subscribe((response: any)=>{
              console.log("actualizado")
              console.log(response)
              this.filename = response.body.filename
              this.getFileName(this.objectsale)
            });

          });
        }else{
          console.log("No hay archivo")
          this.fileService.uploadfileforUserandSale(this.selectedFile,this.objectsale.user.id,this.objectsale.id).subscribe((response: any)=>{
            console.log(response)
            this.filename = response.body.filename
            this.getFileName(this.objectsale)
          });
        }
    });
  }

  getFileName(objectsale:Sale){
    this.fileService.getFileByUserIdandSaleId(objectsale.user.id,objectsale.id).subscribe((response:any)=>{
      console.log(response.content[0])
      this.filename = response.content[0].filename
    });
  }

  DownloadFile(){
    if(this.filename != null){
      this.fileService.downloadFiles(this.filename).subscribe((event:any) =>{
        console.log(event)
        saveAs(new File([event.body!],this.filename,{type: `${event.headers.get('Content-Type')};charset=utf-8`}));
      })
    }else{
      alert("No existe archivo para descargar")  
    }
  }

}
