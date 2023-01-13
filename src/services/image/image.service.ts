import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Image } from 'src/app/models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  basePath = 'https://crm-backend-huaman-ruiz-production.up.railway.app/api/v1/images';
  basePath2 = 'https://crm-backend-huaman-ruiz-production.up.railway.app/api/v1/upload';
  //basePath = 'http://localhost:8080/api/v1/images';
  //basePath2 = 'http://localhost:8080/api/v1/upload';
  
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
  
  createimageforuser(item: File,userId:number){
    const formData = new FormData();
    formData.append('multipartFile', item);
    return this.http.post(`${this.basePath2}/users/${userId}/images`, formData,  { observe: 'response' })
     .pipe(
       retry(2),
        catchError(this.handleError));
  }

  getImageByUserId(id:number){
    return this.http.get<Image>(`${this.basePath}/users/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/delete/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
