import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Pesage } from '../models/Pesage';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PesageListCrudService {

  private url = "http://localhost:3000/pesages"
  
  httpOptions: {headers: HttpHeaders} = {
    headers:new HttpHeaders({"content-Type": "application/json"}),
  };
  constructor(private  errorHandlerService: ErrorHandlerService,private http:HttpClient) { }

  fetchAll():Observable<Pesage[]> {
    return this.http
    .get<Pesage[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched pesages")),
    catchError(this.errorHandlerService.handleError<Pesage[]>("fetchAll", []))
    );
  }


  post(poids: Partial<Pesage>): Observable<any> {
    return this.http
      .post<Partial<Pesage>>(this.url, poids, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }
  update(pesage: Pesage): Observable<any> {
    return this.http
      .put<Pesage>(this.url, pesage, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/pesages/${id}`;

    return this.http
      .delete<Pesage>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
}
