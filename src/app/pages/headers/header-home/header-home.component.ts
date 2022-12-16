import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  idurl!:number
  whois!:string
  constructor(private route:ActivatedRoute, private cd:Router, private ActivateRoute:ActivatedRoute, private tokenService:TokenService) { }

  ngOnInit() {
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.idurl= pod;

    console.log(this.idurl)
    console.log(this.whois)

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

}
