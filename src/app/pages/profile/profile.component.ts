import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idurl!:number
  objectuserurl!:User
  objectupdateuser!:User
  whois!:any
  editactivate:boolean = false
  updateform!:FormGroup

  constructor(private userService:UserService,private ActivateRoute:ActivatedRoute,private router:Router, private formBuilder: FormBuilder) { 
    this.objectuserurl = {} as User;
    this.objectupdateuser = {} as User;
  }

  ngOnInit() {
    this.updateform = this.formBuilder.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
    })

    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl = pod
    console.log(this.idurl)
    console.log(this.whois)
    this.GetUserById(this.idurl)
  }

  GetUserById(id:number){
    this.userService.getbyId(id).subscribe((response:any)=>{
      this.objectuserurl = response
      
      if(this.objectuserurl.rolname == "Engineering_chief"){
        this.objectuserurl.rolname = "Jefe de Ingenieria"
      }else if(this.objectuserurl.rolname == "Project_Manager"){
        this.objectuserurl.rolname = "Jefe de Proyectos"
      }
      
      console.log(this.objectuserurl)

    });
  }

  ActivateEditarPerfil(){
    this.editactivate = true
  }

  EditProfile(){
    console.log(this.objectupdateuser)
    this.userService.update(this.objectuserurl.id,this.objectupdateuser).subscribe((response:any) =>{
      this.editactivate = false
      this.GetUserById(response.id)
    }); 
  }

  GoToEditPassword(){
    this.router.navigate([this.whois,this.idurl,'Edit-password'])
  }
}
