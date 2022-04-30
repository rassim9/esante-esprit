import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Pas } from '../models/Pas';
import { Calories } from '../models/calories';
import { Activemin } from '../models/activemin';
import { Heartmin } from '../models/heartmin';
import { Heartbpm } from '../models/heartbpm';

import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PasService {

  private url = "http://localhost:3000/pas"
  

  
  httpOptions: {headers: HttpHeaders} = {
    headers:new HttpHeaders({"content-Type": "application/json"}),
  };
  constructor(private  errorHandlerService: ErrorHandlerService,private http:HttpClient) { }

  fetchAll():Observable<Pas[]> {
    return this.http
    .get<Pas[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched Pas")),
    catchError(this.errorHandlerService.handleError<Pas[]>("fetchAll", []))
    );
  }

  fetchAllcalories():Observable<Calories[]> {
    const url = "http://localhost:3000/calories";
    return this.http
    .get<Calories[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched calories")),
    catchError(this.errorHandlerService.handleError<Calories[]>("fetchAll", []))
    );
  }
  fetchAllactivemin():Observable<Activemin[]> {
    const url = "http://localhost:3000/activemin";
    return this.http
    .get<Activemin[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched activemin")),
    catchError(this.errorHandlerService.handleError<Activemin[]>("fetchAll", []))
    );
  }
  fetchAllheartmin():Observable<Heartmin[]> {
    const url = "http://localhost:3000/heartmin";
    return this.http
    .get<Heartmin[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched heartmin")),
    catchError(this.errorHandlerService.handleError<Heartmin[]>("fetchAll", []))
    );
  }
  fetchAllheartbpm():Observable<Heartbpm[]> {
    const url = "http://localhost:3000/heartbpm";
    return this.http
    .get<Heartbpm[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched heartbpm")),
    catchError(this.errorHandlerService.handleError<Heartbpm[]>("fetchAll", []))
    );
  }
  fetchmycalories():Observable<Calories[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/calories/${email}`;
    return this.http
    .get<Calories[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched calories")),
    catchError(this.errorHandlerService.handleError<Calories[]>("fetchAll", []))
    );
  }
}
