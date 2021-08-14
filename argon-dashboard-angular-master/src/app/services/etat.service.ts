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
  private url = "http://localhost:3000/etats";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
 

  fetchAll():Observable<Etat[]> {
    const id =localStorage.getItem('id');
    const url = `http://localhost:3000/etats/${id}`;
    return this.http
    .get<Etat[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched etats")),
    catchError(this.errorHandlerService.handleError<Etat[]>("fetchAll", []))
    );
  }

  createEtat(formData: Partial<Etat>): Observable<Etat>{
    const id =localStorage.getItem('id');
    var temp="37";
     temp =localStorage.getItem('temp');
    var pansement="non";
    var medicament="non";
     pansement =localStorage.getItem('pansement');
     medicament =localStorage.getItem('medicament');
     if (pansement==null || pansement=="false" ){
       pansement="non";
     }
     else if (pansement=="true")
     {pansement="oui"} 
      if(medicament==null || medicament=="false"){
       medicament="non";
     }
     else if (medicament=="true")
     {medicament="oui"}
     var saignment="non";
     saignment =localStorage.getItem('saignment');
     if (saignment==null || saignment=="false" ){
      saignment="non";
    }
    else if (saignment=="true")
    {saignment="oui"} 

    var douleur="non";
    douleur =localStorage.getItem('douleur');
     if (douleur==null || douleur=="false" ){
      douleur="non";
    }
    else if (douleur=="true")
    {douleur="oui"} 

    var niveau="0";
    niveau =localStorage.getItem('niveau');
     if (niveau==null){
      niveau="0";
    }


     localStorage.removeItem("pansement");
     localStorage.removeItem("medicament");
     localStorage.removeItem("saignment");
     localStorage.removeItem("douleur");



    return this.http

    .post<Etat>(this.url, { forme: formData.forme, description: formData.description,temp:temp,pansement:pansement,saignment:saignment,medicament:medicament,douleur:douleur,niveau:niveau, username: id}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Etat>("createEtat"))
         

    ); 

  }

  deleteEtat(id:Pick<Etat, "id">): Observable<{}>{
    const url = `http://localhost:3000/etats/${id}`;
    return this.http.delete<Etat>(url, this.httpOptions)
    .pipe(
      first(),
    catchError(this.errorHandlerService.handleError<Etat>("deleteEtat"))
)
  }


}
