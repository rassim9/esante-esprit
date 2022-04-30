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
import { Alimentation } from 'src/app/models/alimentation';

import { PasService } from 'src/app/services/pas.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { AlimentationService } from 'src/app/services/alimentation.service';
import { PoidsService } from 'src/app/services/poids.service';
import { PatientService } from 'src/app/services/patient.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { Data } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Etat } from 'src/app/models/Etat';
import { User } from 'src/app/models/User';

import { EtatService} from 'src/app/services/etat.service';
import { RdvService } from 'src/app/services/rdv.service';
import { Rdv } from 'src/app/models/Rdv';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {

  pesages$:Observable<Pesage[]>
  poids$:Observable<Poids[]>
  pas$:Observable<Pas[]>
  patient$:Observable<Patient[]>
  calories$:Observable<Calories[]>
  active$:Observable<Activemin[]>
  heartmin$:Observable<Heartmin[]>
  heartbpm$:Observable<Heartbpm[]>
  medicament$:Observable<Medicament[]>
  alimentation$:Observable<Alimentation[]>
  etats$:Observable<Etat[]>;
  mydata$:Observable<Patient[]>
  rdv$:Observable<Rdv[]>

  form: FormGroup ;
  form2: FormGroup ;
result:any;
tab:any;
val:any;
  constructor(private RdvService: RdvService,private pesageListCrudService: PesageListCrudService, private PoidsService: PoidsService,private PasService: PasService,private PatientService: PatientService,private MedicamentService: MedicamentService,private AlimenataionService: AlimentationService,
    private EtatService:EtatService) { }

  ngOnInit():void {
    this.pesages$ = this.pesageListCrudService.fetchAll();
    this.poids$ = this.PoidsService.fetchAll();
    this.pas$ = this.PasService.fetchAll();
    this.patient$ = this.PatientService.fetchAllpatient();
    this.etats$ = this.EtatService.fetchAll();
    this.mydata$ = this.PatientService.fetchAllpatient();
    this.rdv$ = this.RdvService.fetchAll();

    this.calories$ = this.PasService.fetchAllcalories();
    this.active$ = this.PasService.fetchAllactivemin();
    this.heartmin$ = this.PasService.fetchAllheartmin();
    this.heartbpm$ = this.PasService.fetchAllheartbpm();
    this.medicament$ = this.MedicamentService.fetchAllmedicament();
    this.alimentation$ = this.AlimenataionService.fetchAllAlimentation();
    this.form = this.createFormGroup();
    this.form2 = this.createFormaliment();
    //this.val=this.fetchAllpoids().subscribe(valeur => valeur.map((poids:any) =>poids.valeur));
//console.log(this.val);
    this.poids();

  }

  
  
  data: Data[];

  public lineChartData: ChartDataSets[] = [
    
    
  ];
  public lineChartLabels: Label[] = ['Jour1', 'Jour2', 'Jour3', 'Jour4', 'Jour5', 'Jour6', 'Jou7'];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'DodgerBlue',
      backgroundColor: 'rgb(0, 0, 255)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  poids():void{
    this.fetchAllpoids().subscribe((data: any) => {
      console.log(data.map(item => item.valeur));
      this.data = data;
      this.lineChartData.push({             // <-- push value to `lineChartData`
        data: data.map(item => item.valeur),  
        label: 'Poids'
      });
    
    
    });
    }




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
  fetchAlletats():Observable<Etat[]>{
    return this.EtatService.fetchAll();
  }
  mydata():Observable<Patient[]>{
    return this.PatientService.mydata();
  }
  fetchAllrdv():Observable<Rdv[]>{
    return this.RdvService.fetchAllp();
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
      patient: new FormControl("", [Validators.required, ]),
     

    });
  }

  onSubmit(formData : Pick<Medicament, "nom" | "dosage" | "duree"| "autre"| "patient">):void {
    console.log(formData);
    this.createFormGroup();
    this.create();
    this.form.reset();
    this.medicament$ = this.fetchAllmedicament();

  }
  create(): void {

    this.MedicamentService.createmedicament(this.form.value).subscribe((msg) => console.log(msg));  }
    
  
  deletemedicament(id: number): void {
    this.medicament$ = this.PatientService
      .delete(id)
      .pipe(tap(() => (this.medicament$ = this.fetchAllmedicament())));
  }


  fetchAllalimentation(): Observable<Alimentation[]> {
    return this.AlimenataionService.fetchAllAlimentation();
  }
  createFormaliment(): FormGroup {
    return new FormGroup({
      deb: new FormControl("", [Validators.required,]),
      fin: new FormControl("", [Validators.required,]),
      heure: new FormControl("", [Validators.required,]),
      aliment: new FormControl("", [Validators.required, ]),
      qte: new FormControl("", [Validators.required, ]),
     

    });
  }

  onSubmit2(formData2 : Pick<Alimentation, "deb" | "fin" | "heure"| "aliment" | "qte">):void {
    console.log(formData2);
    this.createFormaliment();
    this.createaliment();
    this.form2.reset();
    this.alimentation$ = this.fetchAllalimentation();

  }
  createaliment(): void {

    this.AlimenataionService.createAlimentation(this.form2.value).subscribe((msg) => console.log(msg));  }
    
  
  deletealiment(id: number): void {
    this.alimentation$ = this.AlimenataionService
      .delete(id)
      .pipe(tap(() => (this.alimentation$ = this.fetchAllalimentation())));
  }





}
