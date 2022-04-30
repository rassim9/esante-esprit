import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000/user"
  
  httpOptions: {headers: HttpHeaders} = {
    headers:new HttpHeaders({"content-Type": "application/json"}),
  };
  constructor(private  errorHandlerService: ErrorHandlerService,private http:HttpClient) { }

  findid(id: number):Observable<User[]> {
    return this.http
    .get<User[]>(`${this.url}/${id}`, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched User")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }
  findall():Observable<User[]> {
    const url = "http://localhost:3000/user/all"

    return this.http
    .get<User[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched User")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }
  findNut():Observable<User[]> {
    const url = "http://localhost:3000/user/nut"

    return this.http
    .get<User[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched nut")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }
  findpsy():Observable<User[]> {
    const url = "http://localhost:3000/user/psy"

    return this.http
    .get<User[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched nut")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }
  findcard():Observable<User[]> {
    const url = "http://localhost:3000/user/card"

    return this.http
    .get<User[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched nut")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }
  findautrem():Observable<User[]> {
    const url = "http://localhost:3000/user/autrem"

    return this.http
    .get<User[]>(url, { responseType: "json"})
    .pipe(tap((_) => console.log("fetched nut")),
    catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
    );
  }

}
