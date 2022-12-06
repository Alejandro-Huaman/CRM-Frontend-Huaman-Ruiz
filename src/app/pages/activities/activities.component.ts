import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/services/task/task.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'date', 'description', 'sale','customer'];
  dataSource!:MatTableDataSource<any>;
  startdateformatselected!:any
  pipedate:DatePipe = new DatePipe("en-US")

  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator 

  constructor(public dialog:MatDialog, private taskService:TaskService) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.GetAllActivities()  
  }

  GetAllActivities(){
    this.taskService.getAll().subscribe((response:any)=>{
      this.dataSource.data = response.content
      this.dataSource.paginator = this.paginator
      console.log(this.dataSource.data)

      for(var onetask of this.dataSource.data){
        console.log(onetask)
        console.log(onetask.date)
        this.startdateformatselected = this.pipedate.transform(onetask.date, 'dd/MM/yyyy')
        
        console.log(typeof this.startdateformatselected)
        console.log(this.startdateformatselected)

        onetask.date = this.startdateformatselected
      }

    });
  }
}