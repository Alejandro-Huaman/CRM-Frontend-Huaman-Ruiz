import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/services/email/email.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  sendemail!:string
  recoverpasswordform!:FormGroup

  constructor(private formBuilder: FormBuilder,private emailService:EmailService,private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.recoverpasswordform = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
    })
  }

  SendEmail(){
    console.log(this.sendemail)
    this.userService.getbyEmail(this.sendemail).subscribe((responseemail:any)=>{
      this.emailService.sendEmail(this.sendemail,"Recuperar contraseña!","Se confirmo su correo electronico correctamente, regrese a la plataforma y continue el proceso de recuperación de la contraseña").subscribe((response:any)=>{
        alert("Se envio el correo correctamente")
        this.router.navigate(["User",responseemail.id,"create-new-password"])
      },err=>{
        alert("No existe el correo electronico por favor editar su correo electronico")
      });
    },err=>{
      alert("No existe el email por favor coloque el email de su cuenta")
    });
  }

}
