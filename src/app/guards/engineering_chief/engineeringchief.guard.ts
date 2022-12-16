import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'src/services/token/token.service';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EngineeringchiefGuard {

  realRol!:string;

  constructor(private tokenService: TokenService, private router: Router, private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const expectedRol = route.data.expectedRol;
    
    if(this.tokenService.isSalesManager()){
      this.realRol='Sales_Manager'
    }else if(this.tokenService.isProjectManager()){
      this.realRol = "Project_Manager"
    }else if(this.tokenService.isEngineeringChief()){
      this.realRol = "Engineering_chief"
    }

    console.log(this.realRol)

    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      
      this.router.navigate(['/login']);
      return false;

    }

    console.log("es jefe de ingenieria")
    return true;

  }

}
