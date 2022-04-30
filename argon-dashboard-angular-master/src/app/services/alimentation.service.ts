import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Alimentation } from "../models/Alimentation";
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AlimentationService {

  private url = "http://localhost:3000/alimentation";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  

  
  fetchAllAlimentation():Observable<Alimentation[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/alimentation/my/${email}`;
    return this.http
    .get<Alimentation[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Alimentation")),
    catchError(this.errorHandlerService.handleError<Alimentation[]>("fetchAll", []))
    );
  }
  fetchmyAlimentation():Observable<Alimentation[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/alimentation/myalimentation/${email}`;
    return this.http
    .get<Alimentation[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Alimentation")),
    catchError(this.errorHandlerService.handleError<Alimentation[]>("fetchAll", []))
    );
  }

  createAlimentation(formData: Partial<Alimentation>): Observable<Alimentation>{
    const id =localStorage.getItem('id patient');
    const email =localStorage.getItem('email patient');
    return this.http
    .post<Alimentation>(this.url, { deb: formData.deb, fin: formData.fin,heure: formData.heure,aliment: formData.aliment,qte: formData.qte,email:email }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Alimentation>("create Alimentation"))
    ); 

  }

  
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/alimentation/${id}`;

    return this.http
      .delete<Alimentation>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("deleted")));
  }
}
