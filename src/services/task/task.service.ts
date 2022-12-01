import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //basePath = 'https://fortlom-account.herokuapp.com/api/v1/users';
  basePath = 'http://localhost:8080/api/v1/tasks';
  basePath2 = 'http://localhost:8080/api/v1/sales';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private http: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
  
    return throwError('Something happened with request, please try again later');
  }

  getAll(): Observable<Task> {
    return this.http.get<Task>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getbyId(id:any): Observable<Task> {
    return this.http.get<Task>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getbySaleId(saleId:any): Observable<Task> {
    return this.http.get<Task>(`${this.basePath2}/${saleId}/tasks`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  delete(id: any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  create(saleId:number,item: any): Observable<Task> {
    return this.http.post<Task>(`${this.basePath2}/${saleId}/tasks`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
}