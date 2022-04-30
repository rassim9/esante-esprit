import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { User } from "../models/User";
import { Patient } from "../models/Patient";
import { Nutritionniste } from "../models/Nutritionniste";
import { Cardiologue } from "../models/Cardiologue";
import { Operation } from "../models/operation";
import { BehaviorSubject, Observable } from "rxjs";


import { ErrorHandlerService } from './error-handler.service';
import { $ } from 'protractor';
import { Psy } from '../models/psy';


@Injectable({
  providedIn: 'root'
})
export class FicheService {
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }



  createnutritionniste(formData: Partial<Nutritionniste>): Observable<Nutritionniste>{
    const url = `http://localhost:3000/Nutritionniste`;
    const patient =localStorage.getItem('email patient');
    const email =localStorage.getItem('email');
    console.log(patient);
    console.log(email);
    return this.http
    .post<Nutritionniste>(url, { patient:patient, medecin: email,Activite: formData.Activite,Tabac: formData.Tabac,diabete: formData.diabete,Consultation:formData.Consultation,Regime:formData.Regime,
      Reguliere:formData.Reguliere,Alimentation:formData.Alimentation,Hydratation:formData.Hydratation,Obesite:formData.Obesite,Pds:formData.Pds,note:formData.note }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Nutritionniste>("create Nutritionniste"))
    ); 

  }
  fetchAllnut():Observable<Nutritionniste[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/Nutritionniste/${email}`;
    return this.http
    .get<Nutritionniste[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched nut")),
    catchError(this.errorHandlerService.handleError<Nutritionniste[]>("fetchAll", []))
    );
  }



  createCardiologue(formData: Partial<Cardiologue>): Observable<Cardiologue>{
    const url = `http://localhost:3000/cardiologue`;
    const patient =localStorage.getItem('email patient');
    const email =localStorage.getItem('email');
    console.log(patient);
    console.log(email);
    return this.http
    .post<Cardiologue>(url, { patient:patient, medecin: email,hospitalise: formData.hospitalise,accident: formData.accident,prob: formData.prob,anomalie:formData.anomalie,traitement:formData.traitement,
      symptome:formData.symptome,note:formData.note }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Cardiologue>("create Cardiologue"))
    ); 

  }
  fetchAllcard():Observable<Cardiologue[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/cardiologue/${email}`;
    return this.http
    .get<Cardiologue[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Cardiologue")),
    catchError(this.errorHandlerService.handleError<Cardiologue[]>("fetchAll", []))
    );
  }


  createpsy(formData: Partial<Psy>): Observable<Psy>{
    const url = `http://localhost:3000/psy`;
    const patient =localStorage.getItem('email patient');
    const email =localStorage.getItem('email');
    console.log(patient);
    console.log(email);
    return this.http
    .post<Psy>(url, { patient:patient, medecin: email,trouble: formData.trouble,addictions: formData.addictions,difficultes: formData.difficultes,
     note:formData.note }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Psy>("create psy"))
    ); 

  }
  fetchAllpsy():Observable<Psy[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/psy/${email}`;
    return this.http
    .get<Psy[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched psy")),
    catchError(this.errorHandlerService.handleError<Psy[]>("fetchAll", []))
    );
  }


  createoperation(formData: Partial<Operation>): Observable<Operation>{
    const url = `http://localhost:3000/operation`;
    const patient =localStorage.getItem('email patient');
    const email =localStorage.getItem('email');
    console.log(patient);
    console.log(email);
    return this.http
    .post<Operation>(url, { patient:patient, medecin: email,etablissement: formData.etablissement,date: formData.date,heure: formData.heure,precautions:formData.precautions,note:formData.note }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Operation>("create operation"))
    ); 

  }
  fetchoperation():Observable<Operation[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/operation/myoperation/${email}`;
    return this.http
    .get<Operation[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Operation")),
    catchError(this.errorHandlerService.handleError<Operation[]>("fetchAll", []))
    );
  }

  postid(): Observable<Operation> {
    const email= localStorage.getItem("email patient");
    console.log(email);
    const url = `http://localhost:3000/operation/email/${email}`;

    
    return this.http
      .get<Operation>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<Operation>("transfered")));
  }
}
