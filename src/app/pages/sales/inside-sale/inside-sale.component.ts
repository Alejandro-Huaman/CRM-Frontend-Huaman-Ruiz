import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside-sale',
  templateUrl: './inside-sale.component.html',
  styleUrls: ['./inside-sale.component.css']
})
export class InsideSaleComponent implements OnInit {
  hours:string[] = []
  templatehour:string = ":00"
  constructor() { }

  ngOnInit() {
    for(let i=1;i<25;i++){
      this.templatehour = String(i) + this.templatehour;        
      this.hours.push(this.templatehour)
      this.templatehour = ":00"    
    }
  }


}
