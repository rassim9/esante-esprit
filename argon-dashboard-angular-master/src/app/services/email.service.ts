import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { Email } from "../models/email";

import { BehaviorSubject, Observable } from "rxjs";


import { ErrorHandlerService } from './error-handler.service';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = "http://localhost:3000/message";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }


  sendemail(formData: Partial<Email>): Observable<Email>{
    const em =localStorage.getItem('email');

    return this.http
    .post<Email>(this.url, { email: em, dest: formData.dest,object: formData.object, message: formData.message  }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Email>("email sended"))
    ); 

  }


  fetchAll():Observable<Email[]> {
    const email =localStorage.getItem('email');

    const url = `http://localhost:3000/message/mymsg/${email}`
    return this.http
    .get<Email[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Email[]>("fetchAll", []))
    );
  }
  myAll():Observable<Email[]> {
    const email =localStorage.getItem('email');

    const url = `http://localhost:3000/message/myallmsg/${email}`
    return this.http
    .get<Email[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Email[]>("fetchAll", []))
    );
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/message/${id}`;

    return this.http
      .delete<Email>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("deleted")));
  }
}
