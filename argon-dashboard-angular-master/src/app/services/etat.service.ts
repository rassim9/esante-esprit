import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { User } from "../models/User";
import { Etat } from "../models/Etat";
import { BehaviorSubject, Observable } from "rxjs";


import { ErrorHandlerService } from './error-handler.service';
import { $ } from 'protractor';
import { clear } from 'console';


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
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/etats/${email}`;
    return this.http
    .get<Etat[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched etats")),
    catchError(this.errorHandlerService.handleError<Etat[]>("fetchAll", []))
    );
  }

  createEtat(formData: Partial<Etat>): Observable<Etat>{
    const email =localStorage.getItem('email');
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

    var note=0;
    var ntemp=0;
    var npansement=0;
    var nmedic=0;
    var nsaignment=0;
    var ndouleur=0;
    var nniveau=0;
   
    if (parseInt(temp)>39||parseInt(temp)<36){ntemp=2} 
    else if((parseInt(temp)==39)  || (parseInt(temp)==38)|| (parseInt(temp)==36)){ntemp=5}
    else if(parseInt(temp)==37)  {ntemp=10}
    if (pansement=="oui"){npansement=10}
    else if(pansement=="non"){npansement=5}
    if (medicament=="oui"){nmedic=10}
    else if(medicament=="non"){nmedic=5}
    if (saignment=="oui"){nsaignment=5}
    else if(saignment=="non"){nsaignment=10}
    if (douleur=="oui"){ndouleur=5}
    else if(douleur=="non"){ndouleur=10}
    if((parseInt(niveau)==8)  || (parseInt(niveau)==7) || (parseInt(niveau)==6)){nniveau=3}
    else if((parseInt(niveau)==5)  || (parseInt(niveau)==4) || (parseInt(niveau)==3)){nniveau=5}
    else if((parseInt(niveau)==2)  || (parseInt(niveau)==1) || (parseInt(niveau)==0)){nniveau=10}

    note=(ntemp+npansement+nmedic+nsaignment+ndouleur+nniveau)/6
    console.log('douleur:',ndouleur); console.log('medic:',nmedic); console.log('npans:',npansement); console.log('sai:',nsaignment); console.log('ntemp:',ntemp);
    console.log('nniv:',nniveau);
    console.log('note:',note);
    localStorage.removeItem(temp);localStorage.removeItem(pansement);localStorage.removeItem(saignment);localStorage.removeItem(medicament);localStorage.removeItem(douleur);localStorage.removeItem(niveau);
    return this.http

    .post<Etat>(this.url, { forme: formData.forme, description: formData.description,temp:temp,pansement:pansement,saignment:saignment,medicament:medicament,douleur:douleur,niveau:niveau,note:note, username: email}, this.httpOptions)
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
