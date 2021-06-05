import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Pas } from '../models/Pas';
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

}
