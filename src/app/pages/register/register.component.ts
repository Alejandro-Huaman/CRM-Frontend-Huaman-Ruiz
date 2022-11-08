import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAnswerComponent } from '../dialog-answer-messages/register-answer/register-answer.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usertype!:string

  constructor(private ActivateRoute:ActivatedRoute, public dialog:MatDialog) { }

  ngOnInit() {
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
    this.dialog.open(RegisterAnswerComponent)
  }


}
