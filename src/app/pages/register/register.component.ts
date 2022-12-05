import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAnswerComponent } from '../dialog-answer-messages/register-answer/register-answer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { NewUser } from 'src/app/models/newUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usertype!:string
  registerform!:FormGroup
  userobject!:NewUser
  constructor(private ActivateRoute:ActivatedRoute, public dialog:MatDialog, private formBuilder: FormBuilder, private authService:AuthService, private route:Router) {
    this.userobject = {} as NewUser 
  }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
     })
    
    let whois =(this.ActivateRoute.snapshot.url[1].path)
    console.log(whois)
    if(whois == "SalesManager"){
      this.usertype =  "Jefe de Ventas"
    }
    if(whois == "ProjectManager"){
      this.usertype =  "Jefe de Proyectos"
    }
    if(whois == "EngineeringChief"){
      this.usertype =  "Jefe de Ingeniería"
    }

  }

  RegisterUser(){
    console.log(this.userobject)

    if(this.usertype == "Jefe de Ventas"){
      this.authService.RegisterSalesManager(this.userobject).subscribe((response:any) =>{
        this.dialog.open(RegisterAnswerComponent)
        this.route.navigate(['/login']);
      },err =>{
        alert("Nombre de usuario ya existente")
      })
    }
    if(this.usertype == "Jefe de Proyectos"){
      this.authService.RegisterProjectManager(this.userobject).subscribe((response:any) =>{
        this.dialog.open(RegisterAnswerComponent)
        this.route.navigate(['/login']);
      },err =>{
        alert("Nombre de usuario ya existente")
      })
    }
    if(this.usertype == "Jefe de Ingeniería"){
      this.authService.RegisterEngineeringChief(this.userobject).subscribe((response:any) =>{
        this.dialog.open(RegisterAnswerComponent)
        this.route.navigate(['/login']);
      },err =>{
        alert("Nombre de usuario ya existente")
      })
    }
    
  }


}
