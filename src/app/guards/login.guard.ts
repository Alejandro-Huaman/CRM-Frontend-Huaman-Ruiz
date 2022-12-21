import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'src/services/token/token.service';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  realRol!: string;
  
  constructor(private tokenService: TokenService, private router: Router, private userservice:UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  
    if(this.tokenService.isLogged()){
      
      const expectedRol = next.data.expectedRol;
      console.log(expectedRol)
      
      if(this.tokenService.isSalesManager()){
        this.realRol = "Sales_Manager"
      }else if(this.tokenService.isProjectManager()){
        this.realRol = "Project_Manager"
      }else if(this.tokenService.isEngineeringChief()){
        this.realRol = "Engineering_chief"
      }
      
      console.log(this.realRol)

      if(this.realRol == 'Sales_Manager'){
        this.userservice.getbyEmail(this.tokenService.getUserName()).subscribe((response:any)=>{

          this.router.navigate([`/HomeSalesManager/${response.id}`]);
          return false;
        });
      }

      if(this.realRol == 'Project_Manager'){
        this.userservice.getbyEmail(this.tokenService.getUserName()).subscribe((response:any)=>{

          this.router.navigate([`/HomeProjectManager/${response.id}`]);
          return false;
        });
      }

      if(this.realRol == 'Engineering_chief'){
        this.userservice.getbyEmail(this.tokenService.getUserName()).subscribe((response:any)=>{

          this.router.navigate([`/HomeEngineeringChief/${response.id}`]);
          return false;
        });
      }

    }

    return true;
  }

}
