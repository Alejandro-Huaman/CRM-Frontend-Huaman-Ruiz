import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/loginuser';
import { AuthService } from 'src/services/auth/auth.service';
import { TokenService } from 'src/services/token/token.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean = true
  loginobject!:LoginUser
  loginform!:FormGroup

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private tokenService: TokenService, private userService:UserService, private route:Router) { 
    this.loginobject = {} as LoginUser
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
     })
  }

  Login(){
    //console.log(this.loginobject)
    console.log(this.loginform.value.username)
    this.loginobject.username=this.loginform.value.username
    console.log()
    this.loginobject.password=this.loginform.value.password
    console.log(this.loginobject)

    this.authService.LogUser(this.loginobject).subscribe(
      data=>{
        console.log(data)
        this.tokenService.setToken(data.token)
        if(this.tokenService.isSalesManager()==true){
          console.log("es Jefe de Ventas")
          this.userService.getbyUsername(this.tokenService.getUserName()).subscribe((response:any)=>{

            this.route.navigate([`/HomeSalesManager/${response.id}`]);
          })
          
        }
        if(this.tokenService.isProjectManager()==true){
          console.log("es Jefe de Proyectos")
          this.userService.getbyUsername(this.tokenService.getUserName()).subscribe((response:any)=>{

            this.route.navigate([`/HomeProjectManager/${response.id}`]);
          })
          
        }
        if(this.tokenService.isEngineeringChief()==true){
          console.log("es Jefe de Ingenieria")
          this.userService.getbyUsername(this.tokenService.getUserName()).subscribe((response:any)=>{

            this.route.navigate([`/HomeEngineeringChief/${response.id}`]);
          })
          
        }
        
        console.log(data.token)
      },
      err=>{
        alert("campos mal puestos o inexistentes")
      }
    )

  }

}
