import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Medicament } from "../models/medicament";
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private url = "http://localhost:3000/medicament";
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  

  
  fetchAllmedicament():Observable<Medicament[]> {
    const id =localStorage.getItem('id patient');
    const url = `http://localhost:3000/medicament/my/${id}`;
    return this.http
    .get<Medicament[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Medicament")),
    catchError(this.errorHandlerService.handleError<Medicament[]>("fetchAll", []))
    );
  }
  fetchmymedicament():Observable<Medicament[]> {
    const email =localStorage.getItem('email');
    const url = `http://localhost:3000/medicament/mymedicament/${email}`;
    return this.http
    .get<Medicament[]>(url, { responseType: "json" })
    .pipe(tap((_) => console.log("fetched Medicament")),
    catchError(this.errorHandlerService.handleError<Medicament[]>("fetchAll", []))
    );
  }

  createmedicament(formData: Partial<Medicament>): Observable<Medicament>{
    const id =localStorage.getItem('id patient');
    const email =localStorage.getItem('email patient');
    return this.http
    .post<Medicament>(this.url, { nom: formData.nom, dosage: formData.dosage,duree: formData.duree,autre: formData.autre,patient: id,email:email }, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Medicament>("create Medicament"))
    ); 

  }

  
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/medicament/${id}`;

    return this.http
      .delete<Medicament>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("deleted")));
  }
}
