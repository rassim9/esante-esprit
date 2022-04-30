import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { first,catchError, tap } from 'rxjs/operators';
import { User } from "../models/User";
import { Patient } from "../models/Patient";
import { BehaviorSubject, Observable } from "rxjs";


import { ErrorHandlerService } from './error-handler.service';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url = "http://localhost:3000/patient";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  count():Observable<Patient[]> {
    const url = `http://localhost:3000/patient/count`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("Patients counted")),
    catchError(this.errorHandlerService.handleError<Patient[]>("counted", []))
    );
  }
  countp():Observable<Patient[]> {
    const id =localStorage.getItem('id');
    const url = `http://localhost:3000/patient/count/${id}`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("Patients counted")),
    catchError(this.errorHandlerService.handleError<Patient[]>("counted", []))
    );
  }

  fetchAll():Observable<Patient[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/patient/${email}`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }
  fetchAllpatients():Observable<Patient[]> {
 
    const url = `http://localhost:3000/patient/patients`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched all Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }
  mydata():Observable<Patient[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/patient/mydata/${email}`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }
  fetchAllpatient():Observable<Patient[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/patient/my/${email}`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }
  fetchAllpatientop():Observable<Patient[]> {
    const email =localStorage.getItem('email patient');
    const url = `http://localhost:3000/patient/op/${email}`;
    return this.http
    .get<Patient[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }
  createPatient(formData: Partial<Patient>): Observable<Patient>{
    const id =localStorage.getItem('id');
    var imc= (parseFloat(formData.poids)/(parseFloat(formData.taille)/100*parseFloat(formData.taille)/100)).toFixed(2);
    var classe="";
    if (parseFloat(imc) <= 18.5){classe="Insuffisance pondérale (maigreur)" }
    else if  (parseFloat(imc) < 25 && parseFloat(imc) > 18.5 ){classe="Corpulence normale" }
    else if  (parseFloat(imc) < 30 && parseFloat(imc) >= 25 ){classe="Surpoids" }
    else if  (parseFloat(imc) < 35 && parseFloat(imc) >= 30 ){classe="Obésité modérée" }
    else if  (parseFloat(imc) < 40 && parseFloat(imc) >= 35 ){classe="Obésité sévère" }
    else if  (parseFloat(imc) >= 40 ){classe="Obésité massive" }
    console.log(classe);
    var s;
    if(formData.sexe=="Masculin"){s=1}else {s=0};
  
    var img=((parseFloat(imc)*1.2)+(0.23*parseInt(formData.age))-(10.8*s)-5.4).toFixed(2);
    var classeimg="";
    if (s=0){
    if (parseFloat(img) < 25){classeimg="Maigreur" }
    else if (parseFloat(img) < 30 && parseFloat(img) >= 25 ){classeimg="Normal" }
    else if (  parseFloat(img) >= 30 ){classeimg="Excès de masse grasse" }
  }
  else if (s=1){
    if (parseFloat(img) < 15){classeimg="Maigreur" }
    else if (parseFloat(img) < 20 && parseFloat(img) >= 15 ){classeimg="Normal" }
    else if ( parseFloat(img) >= 20 ){classeimg="Excès de masse grasse" }
  }
  console.log(classeimg);
  if(s=0){
     var pideal=parseFloat(formData.taille)-100-((parseFloat(formData.taille)-150)/2.5)
  }
  else if(s=1){
    var pideal=parseFloat(formData.taille)-100-((parseFloat(formData.taille)-150)/4)
 }
 

    return this.http
    .post<Patient>(this.url, { email: formData.email, patientid: formData.patientid,secret: formData.secret,nom: formData.nom,prenom: formData.prenom,sexe: formData.sexe,age: formData.age,poids: formData.poids,taille: formData.taille,type: formData.type,rpps: formData.rpps, dateint: formData.dateint ,imc: imc,classe:classe,img:img,classeimg:classeimg,pideal:pideal,medecin :id,Nutritionniste:formData.Nutritionniste,Psychologue:formData.Psychologue,
      Cardiologue:formData.Cardiologue,Soignant:formData.Soignant,autre:formData.autre }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Patient>("createPatient"))
    ); 

  }

  
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/patient/${id}`;

    return this.http
      .delete<Patient>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("deleted")));
  }
  postid(email:string): Observable<any> {
    const url = `http://localhost:3000/patient/patientid/${email}`;
console.log(email);
    return this.http
      .get<Patient>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("transfered")));
  }

  
  update(patient: Patient): Observable<any> {
    return this.http
      .put<Patient>(this.url, patient, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

}
