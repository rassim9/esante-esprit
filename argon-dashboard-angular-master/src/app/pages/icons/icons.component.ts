import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Patient } from 'src/app/models/Patient';
import { User } from 'src/app/models/User';
import { tap } from 'rxjs/operators';

import { PatientService} from 'src/app/services/patient.service';
import { AuthService} from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  form: FormGroup ;

Patients$: Observable<Patient[]>;
num$: Observable<Patient[]>;
nump$: Observable<Patient[]>;




  constructor(private PatientService: PatientService ) { }

  ngOnInit():void {
    this.form = this.createFormGroup();
    this.Patients$=this.fetchAll();
    this.num$=this.count();
    this.nump$=this.countp();

   
    }

    fetchAll(): Observable<Patient[]> {
      return this.PatientService.fetchAll();
    }
    count(): Observable<Patient[]> {
      return this.PatientService.count();
    }

    countp(): Observable<Patient[]> {
      return this.PatientService.countp();
    }
    createFormGroup(): FormGroup {
      return new FormGroup({
        email: new FormControl("", [Validators.required, Validators.minLength(5)]),
        patientid: new FormControl("", [Validators.required, Validators.minLength(5)]),
        secret: new FormControl("", [Validators.required, Validators.minLength(5)]),
        nom: new FormControl("", [Validators.required, ]),
        prenom: new FormControl("", [Validators.required, ]),
        sexe: new FormControl("", [Validators.required, ]),
        age: new FormControl("", [Validators.required, ]),
        poids: new FormControl("", [Validators.required, ]),
        taille: new FormControl("", [Validators.required, ]),
        periode: new FormControl("", [Validators.required, Validators.minLength(1)]),
        etat: new FormControl("", [Validators.required, Validators.minLength(1)]),
        dateint: new FormControl("", [Validators.required, ]),




      });
    }

    onSubmit(formData : Pick<Patient, "email" | "patientid" | "secret"| "nom"| "prenom"| "sexe"| "age"| "poids"| "taille"| "periode"| "etat"| "dateint">):void {
      console.log(formData);
      //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
      this.createFormGroup();
      this.create();
      this.form.reset();
      this.Patients$ = this.fetchAll();
      this.num$=this.count();
      this.nump$=this.countp();

    }
    create(): void {

      this.PatientService.createPatient(this.form.value).subscribe((msg) => console.log(msg));  }
      
    
    delete(id: number): void {
      this.Patients$ = this.PatientService
        .delete(id)
        .pipe(tap(() => (this.Patients$ = this.fetchAll(),this.num$=this.count(), this.nump$=this.countp())));
    }

    postid(id: number,email:string): void {
      localStorage.setItem("id patient",String(id));
      localStorage.setItem("email patient",email
      );

      this.Patients$ = this.PatientService
        .postid(id)
        .pipe(tap(() => (this.Patients$ = this.fetchAll())));
    }
}
