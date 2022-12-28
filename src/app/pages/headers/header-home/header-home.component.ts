import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/services/image/image.service';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  idurl!:number
  whois!:string
  profileimage!:any
  constructor(private route:ActivatedRoute, private cd:Router, private ActivateRoute:ActivatedRoute, private tokenService:TokenService,private imageService:ImageService) { }

  ngOnInit() {
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl= pod;

    console.log(this.idurl)
    console.log(this.whois)
    
    this.getImage()
  }

  GoToHome(){
    this.cd.navigate([this.whois,this.idurl])
  }

  GoToCustomers(){
    this.cd.navigate([this.whois,this.idurl,'Customers'])
  }

  GoToSales(){
    this.cd.navigate([this.whois,this.idurl,'Sales'])
  }

  GoToActivities(){
    this.cd.navigate([this.whois,this.idurl,'Activities'])
  }

  LogOut(){
    this.tokenService.logOut()
  }

  Profile(){
    this.cd.navigate([this.whois,this.idurl,'Profile'])
  }

  getImage(){
    
    this.imageService.getImageByUserId(this.idurl).subscribe((response: any)=>{   
        
        if(response.numberOfElements == 0){
            this.profileimage="assets/images/perfil.png"
            
        }else{
            this.profileimage=response.content[0].imagenUrl
        }

    });

  }

}
