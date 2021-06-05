import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { User } from "../models/User";
import { Etat } from "../models/Etat";
import { BehaviorSubject, Observable } from "rxjs";


import { ErrorHandlerService } from './error-handler.service';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class EtatService {
  private url = "http://localhost:3000/etat";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
 

  fetchAll():Observable<Etat[]> {
    return this.http
    .get<Etat[]>(this.url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched etats")),
    catchError(this.errorHandlerService.handleError<Etat[]>("fetchAll", []))
    );
  }

  createEtat(formData: Partial<Etat>,userId: Pick<User, "id">): Observable<Etat>{
    return this.http
    .post<Etat>(this.url, { forme: formData.forme, desc: formData.desc, user: userId }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Etat>("createEtat"))
    ); 

  }

  deleteEtat(etatId:Pick<Etat, "id">): Observable<{}>{
    return this.http.delete<Etat>('${this.url}/${etatId}', this.httpOptions)
    .pipe(
      first(),
    catchError(this.errorHandlerService.handleError<Etat>("deleteEtat"))
)
  }


}
