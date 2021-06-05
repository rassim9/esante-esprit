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

  

  fetchAll():Observable<Patient[]> {
    return this.http
    .get<Patient[]>(this.url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Patients")),
    catchError(this.errorHandlerService.handleError<Patient[]>("fetchAll", []))
    );
  }

  createPatient(formData: Partial<Patient>): Observable<Patient>{
    return this.http
    .post<Patient>(this.url, { email: formData.email, patientid: formData.patientid,secret: formData.secret  }, this.httpOptions)
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
  postid(id: number): Observable<any> {
    const url = `http://localhost:3000/patient/patientid/${id}`;

    return this.http
      .get<Patient>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("transfered")));
  }


}
