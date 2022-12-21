import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //basePath = 'https://fortlom-account.herokuapp.com/api/v1/users';
  basePath = 'http://localhost:8080/api/v1/customers';
  
  
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

  getAll(): Observable<Customer> {
    return this.http.get<Customer>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getbyId(id:any): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getbyBusinessName(businessname:any): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}/businessname/${businessname}`, this.httpOptions)
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

  update(id:number,item: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<Customer> {
    return this.http.post<Customer>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
