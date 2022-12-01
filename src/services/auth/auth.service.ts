import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { JwtDTO } from 'src/app/models/JwtDTO';
import { LoginUser } from 'src/app/models/loginuser';
import { NewUser } from 'src/app/models/newUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //basePath = 'https://fortlom-account.herokuapp.com/auth';
  basePath = 'http://localhost:8080/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }

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


  LogUser(item: LoginUser): Observable<JwtDTO>{
    return this.http.post<any>(`${this.basePath}/login`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  
  RegisterEngineeringChief(item:NewUser): Observable<any>{

     return this.http.post<any>(`${this.basePath}/engineerchief`, item, this.httpOptions)

  }

  RegisterProjectManager(item:NewUser): Observable<any>{

    return this.http.post<any>(`${this.basePath}/projectmanager`, item, this.httpOptions)

  }

  RegisterSalesManager(item:NewUser): Observable<any>{

    return this.http.post<any>(`${this.basePath}/salesmanager`, item, this.httpOptions)

  }

}
