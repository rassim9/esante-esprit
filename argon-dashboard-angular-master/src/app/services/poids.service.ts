import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Poids } from '../models/Poids';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PoidsService {


 private url = "http://localhost:3000/poids"
  
  httpOptions: {headers: HttpHeaders} = {
    headers:new HttpHeaders({"content-Type": "application/json"}),
  };
  constructor(private  errorHandlerService: ErrorHandlerService,private http:HttpClient) { }

  fetchAll():Observable<Poids[]> {
    return this.http
    .get<Poids[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched Poids")),
    catchError(this.errorHandlerService.handleError<Poids[]>("fetchAll", []))
    );
  }
  fetchmy():Observable<Poids[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/poids/${email}`
    return this.http
    .get<Poids[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched Poids")),
    catchError(this.errorHandlerService.handleError<Poids[]>("fetchAll", []))
    );
  }



  
}
