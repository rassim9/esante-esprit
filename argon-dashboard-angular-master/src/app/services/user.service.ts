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

}
