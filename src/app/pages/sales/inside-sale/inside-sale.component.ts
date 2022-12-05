import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { SaleService } from 'src/services/sale/sale.service';

@Component({
  selector: 'app-inside-sale',
  templateUrl: './inside-sale.component.html',
  styleUrls: ['./inside-sale.component.css']
})
export class InsideSaleComponent implements OnInit {
  hours:string[] = []
  templatehour:string = ":00"
  whois!:string
  saleidurl!:number
  objectsale!:Sale
  constructor(private ActivateRoute:ActivatedRoute, private saleService:SaleService) { 
    this.objectsale = {} as Sale
  }

  ngOnInit() {
    let pod=parseInt(this.ActivateRoute.snapshot.paramMap.get('saleid')!);
    this.whois = (this.ActivateRoute.snapshot.url[0].path)
    this.saleidurl= pod;

    console.log(this.whois)
    console.log(this.saleidurl)

    for(let i=1;i<25;i++){
      this.templatehour = String(i) + this.templatehour;        
      this.hours.push(this.templatehour)
      this.templatehour = ":00"    
    }

    this.GetSaleById(this.saleidurl)
  }

  GetSaleById(saleid:number){
    this.saleService.getbyId(saleid).subscribe((response:any) =>{
      this.objectsale = response
      console.log(this.objectsale)
    });
  }

}
