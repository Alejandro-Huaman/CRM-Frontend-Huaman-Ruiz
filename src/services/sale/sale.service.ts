import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Sale } from 'src/app/models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  //basePath = 'https://fortlom-account.herokuapp.com/api/v1/users';
  basePath = 'http://localhost:8080/api/v1/sales';
  basePath2 = 'http://localhost:8080/api/v1/status';
  basePath3 = 'http://localhost:8080/api/v1/user';
  basePath4 = 'http://localhost:8080/api/v1/numbersales';
  
  
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

  getAll(): Observable<Sale> {
    return this.http.get<Sale>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getbyId(id:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getbyCustomerId(customerId:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/customer/${customerId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getbyUserId(userId:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/user/${userId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getbyStatusId(statusId:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath2}/${statusId}/sales`, this.httpOptions)
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

  updateStatus(id:number,item: any): Observable<Sale> {
    return this.http.put<Sale>(`${this.basePath}/${id}/status`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(userId:number,customerId:number,item: any): Observable<Sale> {
    return this.http.post<Sale>(`${this.basePath3}/${userId}/customer/${customerId}/sales`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getSaleByMonth(month:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/month/${month}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  getSaleByYear(year:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/year/${year}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getSaleByMonthAndYear(month:any,year:any): Observable<Sale> {
    return this.http.get<Sale>(`${this.basePath}/month/${month}/year/${year}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getNumberofSaleByCustomerId(customerid:number){
    return this.http.get<number>(`${this.basePath4}/customer/${customerid}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
}
