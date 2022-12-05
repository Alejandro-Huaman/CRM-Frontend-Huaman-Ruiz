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
    });
  }
}