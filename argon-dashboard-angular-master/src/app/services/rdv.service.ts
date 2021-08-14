import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Rdv } from "../models/Rdv";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private url = "http://localhost:3000/rdv";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

 //const id = AuthService.getuserId();
  
  id =localStorage.getItem('id');
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  

  fetchAll():Observable<Rdv[]> {
    const id =localStorage.getItem('id');
    const url = `http://localhost:3000/rdv/myrdv/${id}`
    return this.http
    .get<Rdv[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Rdvs")),
    catchError(this.errorHandlerService.handleError<Rdv[]>("fetchAll", []))
    );
  }
  fetchAllp():Observable<Rdv[]> {
    const id =localStorage.getItem('id patient');
    const url = `http://localhost:3000/rdv/rdv/${id}`
    return this.http
    .get<Rdv[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Rdvs")),
    catchError(this.errorHandlerService.handleError<Rdv[]>("fetchAll", []))
    );
  }

  createRdv(formData: Partial<Rdv>): Observable<Rdv>{
    return this.http
    .post<Rdv>(this.url, { title: formData.title, date: formData.date,p1: this.id,p2: formData.p2    }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Rdv>("createRdv"))
    ); 

  }
  addEvent(event) {
    return this.http.post(this.url , event);
  }



  
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/rdv/${id}`;

    return this.http
      .delete<Rdv>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("deleted")));
  }
}
