import { HttpClient,HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Extension } from 'src/app/models/extension';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  basePath = 'http://localhost:8080/api/v1/file';
  
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

  uploadfileforUserandSale(item:File,userid:number,saleid:number){
    const formData = new FormData();
    formData.append('files', item);
    return this.http.post(`${this.basePath}/upload/user/${userid}/sale/${saleid}`, formData,  { observe: 'response' })
     .pipe(
       retry(2),
        catchError(this.handleError));
  }

  downloadFiles(filename:string):Observable<HttpEvent<Blob>>{
    return this.http.get(`${this.basePath}/download/${filename}`,  { observe: 'events', responseType: 'blob' })
     .pipe(
       retry(2),
        catchError(this.handleError));
  }

  getFileByUserIdandSaleId(userid:number,saleid:number){
    return this.http.get<Extension>(`${this.basePath}/user/${userid}/sale/${saleid}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
