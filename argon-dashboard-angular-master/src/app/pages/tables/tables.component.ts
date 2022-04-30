import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pesage } from 'src/app/models/Pesage';

import { Poids } from 'src/app/models/Poids';
import { Patient } from 'src/app/models/Patient';
import { PesageListCrudService } from 'src/app/services/pesage-list-crud.service';
import { Pas } from 'src/app/models/Pas';
import { Calories } from 'src/app/models/calories';
import { Activemin } from 'src/app/models/activemin';
import { Heartmin } from 'src/app/models/heartmin';
import { Heartbpm } from 'src/app/models/heartbpm';
import { Medicament } from 'src/app/models/medicament';
import { Rdv } from 'src/app/models/Rdv';
import { Nutritionniste } from 'src/app/models/Nutritionniste';

import { PasService } from 'src/app/services/pas.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { RdvService } from 'src/app/services/rdv.service';
import { FicheService } from 'src/app/services/fiche.service';

import { PoidsService } from 'src/app/services/poids.service';
import { PatientService } from 'src/app/services/patient.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Data } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RdvComponent } from '../rdv/rdv.component';
import { Operation } from 'src/app/models/operation';
import { Cardiologue } from 'src/app/models/Cardiologue';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  pesages$:Observable<Pesage[]>
  poids$:Observable<Poids[]>
  pas$:Observable<Pas[]>
  patient$:Observable<Patient[]>
  calories$:Observable<Calories[]>
  active$:Observable<Activemin[]>
  heartmin$:Observable<Heartmin[]>
  heartbpm$:Observable<Heartbpm[]>
  medicament$:Observable<Medicament[]>
  rdv$:Observable<Rdv[]>
  nut$:Observable<Nutritionniste[]>
  card$:Observable<Cardiologue[]>
  form: FormGroup ;
  formop: FormGroup ;

  constructor(private pesageListCrudService: PesageListCrudService, private PoidsService: PoidsService,private PasService: PasService,private PatientService: PatientService,
    private MedicamentService: MedicamentService,private RdvService: RdvService,private FicheService : FicheService) { }

  ngOnInit():void {
    this.pesages$ = this.pesageListCrudService.fetchAll();
    this.poids$ = this.PoidsService.fetchAll();
    this.pas$ = this.PasService.fetchAll();
    this.patient$ = this.PatientService.fetchAllpatient();
    
    this.calories$ = this.PasService.fetchAllcalories();
    this.active$ = this.PasService.fetchAllactivemin();
    this.heartmin$ = this.PasService.fetchAllheartmin();
    this.heartbpm$ = this.PasService.fetchAllheartbpm();
    this.medicament$ = this.MedicamentService.fetchAllmedicament();
    this.rdv$ = this.RdvService.fetchAllp();
    this.nut$ = this.FicheService.fetchAllnut();
    this.card$ = this.FicheService.fetchAllcard();
    this.form = this.createFormGroup();
    this.formop = this.createFormGroupop();
    

  }


  data: Data[];
  lineChartData: ChartDataSets[] = [
   
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';




fetchp():void{
  this.PoidsService.fetchAll().subscribe(
    response => {
      this.data = response;
      this.lineChartData.push({             // <-- push value to `lineChartData`
        data: response.map(item => item.id),  
        label: 'Crude oil prices'
      });
    },
    error => { }
  );}
  
  fetchAllpatient():Observable<Patient[]>{
    return this.PatientService.fetchAllpatient();
  }
  fetchAll():Observable<Pesage[]>{
    return this.pesageListCrudService.fetchAll();
  }
  fetchAllpoids():Observable<Poids[]>{
    return this.PoidsService.fetchAll();
  }
  fetchAllcalories():Observable<Calories[]>{
    return this.PasService.fetchAllcalories();
  }
  fetchAllactivemin():Observable<Activemin[]>{
    return this.PasService.fetchAllactivemin();
  }
  fetchAllheartmin():Observable<Heartmin[]>{
    return this.PasService.fetchAllheartmin();
  }
  fetchAllheartbpm():Observable<Heartbpm[]>{
    return this.PasService.fetchAllheartbpm();
  }
  fetchAllrdv():Observable<Rdv[]>{
    return this.RdvService.fetchAllp();
  }
  fetchAllnut():Observable<Nutritionniste[]>{
    return this.FicheService.fetchAllnut();
  }
  fetchAllcard():Observable<Cardiologue[]>{
    return this.FicheService.fetchAllcard();
  }
  

  post(pesagePoids: Partial<Pesage>): void {
    const poids = (<string>pesagePoids).trim();
    if (!poids) return;

    this.pesages$ = this.pesageListCrudService
      .post({ poids })
      .pipe(tap(() => (this.pesages$ = this.fetchAll())));
  }
  
  update(id: number, newPoids: Partial<Pesage>): void {
    const poids = (<string>newPoids).trim();
    if (!poids) return;

    const newPesage: Pesage = {
      id,
      poids,
    };

    this.pesages$ = this.pesageListCrudService
      .update(newPesage)
      .pipe(tap(() => (this.pesages$ = this.fetchAll())));
  }

  delete(id: number): void {
    this.pesages$ = this.pesageListCrudService
      .delete(id)
      .pipe(tap(() => (this.pesages$ = this.fetchAll())));
  }
  fetchAllpas():Observable<Pas[]>{
    return this.PasService.fetchAll();
  }
  

  fetchAllmedicament(): Observable<Medicament[]> {
    return this.MedicamentService.fetchAllmedicament();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      nom: new FormControl("", [Validators.required, Validators.minLength(2)]),
      dosage: new FormControl("", [Validators.required, Validators.minLength(2)]),
      duree: new FormControl("", [Validators.required, Validators.minLength(2)]),
      autre: new FormControl("", [Validators.required, ]),
     

    });
  }

  onSubmit(formData : Pick<Medicament, "nom" | "dosage" | "duree"| "autre">):void {
    console.log(formData);
    this.createFormGroup();
    this.create();
    this.form.reset();
    this.medicament$ = this.fetchAllmedicament();

  }
  create(): void {

    this.MedicamentService.createmedicament(this.form.value).subscribe((msg) => console.log(msg));  }
    
  
  deletemedicament(id: number): void {
    this.medicament$ = this.MedicamentService
      .delete(id)
      .pipe(tap(() => (this.medicament$ = this.fetchAllmedicament())));
  }

  createFormGroupop(): FormGroup {
    return new FormGroup({
      etablissement: new FormControl("", [Validators.required, Validators.minLength(2)]),
      date: new FormControl("", [Validators.required]),
      heure: new FormControl("", [Validators.required, Validators.minLength(2)]),
      precautions: new FormControl("", [Validators.required, ]),
      note: new FormControl("", [Validators.required, ]),
     

    });
  }

  onSubmitop(formData : Pick<Operation, "etablissement" | "date" | "heure"| "precautions"| "note">):void {
    console.log(formData);
    this.createFormGroupop();
    this.createop();
    this.formop.reset();

  }
  createop(): void {

    this.FicheService.createoperation(this.formop.value).subscribe((msg) => console.log(msg));  }

    postid(): void {
      
    const email= localStorage.getItem("email patient");

      this.FicheService
        .postid();
        
       
    }
    

}
