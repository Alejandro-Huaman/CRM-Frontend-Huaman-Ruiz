import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import { DatePipe } from '@angular/common';

SwiperCore.use([Pagination, Navigation,Scrollbar,A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  opened:boolean = false
  constructor() { }

  ngOnInit() {
  }

}
