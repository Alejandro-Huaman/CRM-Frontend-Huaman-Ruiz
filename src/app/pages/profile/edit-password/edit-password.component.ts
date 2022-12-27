import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  idurl!:number
  updatepasswordform!:FormGroup
  objectpassworduser!:User
  whois!:any
  constructor(private formBuilder: FormBuilder,private userService:UserService, private ActivateRoute:ActivatedRoute,private route:Router) {
    this.objectpassworduser = {} as User
  }

  ngOnInit() {
    this.updatepasswordform = this.formBuilder.group({
      password:['',Validators.required],
      oldpassword:['',Validators.required],
      confirmpassword:['',Validators.required],
    })

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl = pod

    console.log(this.idurl)
    console.log(this.whois)
  }

  EditPassword(){
    console.log(this.objectpassworduser)
    this.userService.updatePasswordUser(this.idurl,this.objectpassworduser).subscribe((response:any)=>{
      alert("Se actualizo su contraseña correctamente")
      this.route.navigate([this.whois,this.idurl,'Profile'])
    });
  }

}
