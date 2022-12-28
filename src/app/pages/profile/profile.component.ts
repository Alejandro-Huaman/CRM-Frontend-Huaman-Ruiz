import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ImageService } from 'src/services/image/image.service';
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
  selectedFile!: File;
  imagenMin!: File;
  retrievedImage!:any

  constructor(private userService:UserService,private ActivateRoute:ActivatedRoute,private router:Router, private formBuilder: FormBuilder,private imageService:ImageService) { 
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
    this.getImage()
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

  onFileChanged(event:any){
    console.log(event)

    this.selectedFile = event.target.files[0];
    
    console.log(this.selectedFile)
    
    const fr = new FileReader();
    
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };

    fr.readAsDataURL(this.selectedFile);
    
    console.log("image")
    
    this.imageService.getImageByUserId(this.idurl).subscribe((response: any)=>{
      if(response.content.length){
            console.log(response.content[0])
            this.imageService.delete(response.content[0].id).subscribe((response: any)=>{
            
             this.imageService.createimageforuser(this.selectedFile,this.idurl).subscribe((response: any)=>{
                      console.log("actualizado")
                      console.log(response)
                      this.retrievedImage=response.body.imagenUrl
                      this.getImage()
             });
           });

      }else{
       console.log("sin imagen")
       this.imageService.createimageforuser(this.selectedFile,this.idurl).subscribe((response: any)=>{
               this.retrievedImage=response.imagenUrl
               this.getImage()
       });
      }

    });
  }

  getImage(){
    
    this.imageService.getImageByUserId(this.idurl).subscribe((response: any)=>{   
        
        if(response.numberOfElements == 0){
            this.retrievedImage="assets/images/perfil.png"
            
        }else{
            this.retrievedImage=response.content[0].imagenUrl
        }

    });

  }


}
