import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {
  newpasswordform!:FormGroup
  objectpassworduser!:User
  idurl!:number
  constructor(private formBuilder: FormBuilder, private userService:UserService,private route:Router,private ActivateRoute:ActivatedRoute) { 
    this.objectpassworduser = {} as User;
  }

  ngOnInit() {
    this.newpasswordform = this.formBuilder.group({
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
    })

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.idurl = pod
    console.log(this.idurl)
  }

  EditPassword(){
    console.log(this.objectpassworduser)
    this.userService.updatePasswordUser(this.idurl,this.objectpassworduser).subscribe((response:any)=>{
      alert("Se actualizo su contraseña correctamente")
      this.route.navigate(['login'])
    });
  }
}
