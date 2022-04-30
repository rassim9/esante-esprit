import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Patient } from 'src/app/models/Patient';
import { Nutritionniste } from 'src/app/models/Nutritionniste';
import { User } from 'src/app/models/User';
import { tap } from 'rxjs/operators';

import { PatientService} from 'src/app/services/patient.service';
import { AuthService} from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FicheService } from 'src/app/services/fiche.service';


import { RouterModule, Routes } from '@angular/router';
import { Cardiologue } from 'src/app/models/Cardiologue';
import { Psy } from 'src/app/models/psy';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  form: FormGroup ;
  formnut: FormGroup ;
  formcard: FormGroup ;
  formpsy: FormGroup ;

Patients$: Observable<Patient[]>;
Patientsop$: Observable<Patient[]>;
num$: Observable<Patient[]>;
nump$: Observable<Patient[]>;
users$: Observable<User[]>;
nut$: Observable<User[]>;
psy$: Observable<User[]>;
card$: Observable<User[]>;
autrem$: Observable<User[]>;




  constructor(private PatientService: PatientService,private UserService:UserService,private FicheService:FicheService,private router: Router ) { }

  ngOnInit():void {
    this.form = this.createFormGroup();
    this.formnut = this.createFormGroupnut();
    this.formcard = this.createFormGroupcard();
    this.formpsy = this.createFormGrouppsy();
    this.Patients$=this.fetchAll();
    this.Patientsop$=this.fetchAllop();
    this.num$=this.count();
    this.nump$=this.countp();
    const id =parseInt(localStorage.getItem('id'));

    this.users$=this.UserService.findid(id);
    this.nut$=this.UserService.findNut();
    this.psy$=this.UserService.findpsy();
    this.card$=this.UserService.findcard();
    this.autrem$=this.UserService.findautrem();

   
    }

    fetchAll(): Observable<Patient[]> {
      return this.PatientService.fetchAll();
    }

    fetchAllop(): Observable<Patient[]> {
      return this.PatientService.fetchAllpatientop();
    }
    fetchnut(): Observable<User[]> {
      return this.UserService.findNut();
    }
    fetchpsy(): Observable<User[]> {
      return this.UserService.findpsy();
    }
    fetchcard(): Observable<User[]> {
      return this.UserService.findcard();
    }
    fetchautrem(): Observable<User[]> {
      return this.UserService.findautrem();
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
        patientid: new FormControl("", ),
        secret: new FormControl("", ),
        nom: new FormControl("", [Validators.required, ]),
        prenom: new FormControl("", [Validators.required, ]),
        sexe: new FormControl("", [Validators.required, ]),
        age: new FormControl("", [Validators.required, ]),
        poids: new FormControl("", [Validators.required, ]),
        taille: new FormControl("", [Validators.required, ]),
        type: new FormControl("", [Validators.required, Validators.minLength(1)]),
        rpps: new FormControl("", [Validators.required, Validators.minLength(1)]),
        dateint: new FormControl("", [Validators.required, ]),
        Nutritionniste: new FormControl("", ),
        Psychologue: new FormControl("", ), 
        Cardiologue: new FormControl("", ),
        Soignant: new FormControl("", ),
        autre: new FormControl("", ),



      });
    }

    onSubmit(formData : Pick<Patient, "email" | "patientid" | "secret"| "nom"| "prenom"| "sexe"| "age"| "poids"| "taille"| "type"| "rpps"| "dateint"| "Nutritionniste"| "Psychologue"| "Cardiologue"| "Soignant"| "autre">):void {
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

    postid(email:string): void {
      
      localStorage.setItem("email patient",email);

      this.Patients$ = this.PatientService
        .postid(email)
        .pipe(tap(() => (this.Patients$ = this.fetchAll())));
       
    }
    createFormGroupnut(): FormGroup {
      return new FormGroup({
       
        Activite: new FormControl("",[Validators.required, ] ),
        Tabac: new FormControl("", [Validators.required, ]),
        diabete: new FormControl("", [Validators.required, ]),
        Consultation: new FormControl("", [Validators.required, ]),
        Regime: new FormControl("", [Validators.required, ]),
        Reguliere: new FormControl("", [Validators.required, ]),
        Alimentation: new FormControl("", [Validators.required, ]),
        Hydratation: new FormControl("", [Validators.required, Validators.minLength(1)]),
        Obesite: new FormControl("", [Validators.required, Validators.minLength(1)]),
        Pds: new FormControl("", [Validators.required, ]),
        note: new FormControl("", [Validators.required, ]),
        



      });
    }

    onSubmitnut(email:string,formData : Pick<Nutritionniste, "Activite" | "Tabac" | "diabete"| "Consultation"| "Regime"| "Reguliere"| "Alimentation"| "Hydratation"| "Obesite"| "Pds"| "note">):void {
      console.log(formData);
      localStorage.setItem("email patient",email);
     
      //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
      this.createFormGroupnut();
      this.createnut();
      this.formnut.reset();

     

    }
    createnut(): void {

      this.FicheService.createnutritionniste(this.formnut.value).subscribe((msg) => console.log(msg));  }


   

      createFormGroupcard(): FormGroup {
        return new FormGroup({
         
          hospitalise: new FormControl("",[Validators.required, ] ),
          accident: new FormControl("", [Validators.required, ]),
          prob: new FormControl("", [Validators.required, ]),
          anomalie: new FormControl("", [Validators.required, ]),
          traitement: new FormControl("", [Validators.required, ]),
          symptome: new FormControl("", [Validators.required, ]),
         
          note: new FormControl("", [Validators.required, ]),
          
        });
      }
  
      onSubmitcard(email:string,formData : Pick<Cardiologue, "hospitalise" | "accident" | "prob"| "anomalie"| "traitement"| "symptome"| "note">):void {
        console.log(formData);
        localStorage.setItem("email patient",email);
       
        //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
        this.createFormGroupcard();
        this.createcard();
        this.formcard.reset();
  
       
  
      }
      createcard(): void {
  
        this.FicheService.createCardiologue(this.formcard.value).subscribe((msg) => console.log(msg));  }


        createFormGrouppsy(): FormGroup {
          return new FormGroup({
           
            trouble: new FormControl("",[Validators.required, ] ),
            addictions: new FormControl("", [Validators.required, ]),
            difficultes: new FormControl("", [Validators.required, ]),
         
           
            note: new FormControl("", [Validators.required, ]),
            
          });
        }
    
        onSubmitpsy(email:string,formData : Pick<Psy, "trouble" | "addictions" | "difficultes"| "note">):void {
          console.log(formData);
          localStorage.setItem("email patient",email);
         
          //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
          this.createFormGrouppsy();
          this.createpsy();
          this.formpsy.reset();
    
         
    
        }
        createpsy(): void {
    
          this.FicheService.createpsy(this.formpsy.value).subscribe((msg) => console.log(msg));  }
  
        consulter(email:string): void {
        
          localStorage.setItem("email patient",email);
          this.router.navigate(['/tables']);
    
          
        }
    

}
