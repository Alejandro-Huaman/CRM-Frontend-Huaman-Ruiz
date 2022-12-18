import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  basePath = 'http://localhost:8080/api/v1/email';
  
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

  sendEmail(toEmail:string,subject:string,body:string){
    return this.http.post(`${this.basePath}/send/${toEmail}/content/${subject}/${body}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
