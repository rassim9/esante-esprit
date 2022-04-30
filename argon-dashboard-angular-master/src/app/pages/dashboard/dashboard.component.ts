import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { Chart } from 'chart.js';
import ms from "ms";
import { Observable } from 'rxjs';
import { Calories } from 'src/app/models/calories';
import { Medicament } from 'src/app/models/medicament';
import { Patient } from 'src/app/models/Patient';
import { Poids } from 'src/app/models/Poids';
import { User } from 'src/app/models/User';
import { MedicamentService } from 'src/app/services/medicament.service';
import { PatientService } from 'src/app/services/patient.service';
import { PoidsService } from 'src/app/services/poids.service';
import { FicheService } from 'src/app/services/fiche.service';
import { UserService } from 'src/app/services/user.service';
import { PasService } from 'src/app/services/pas.service';
import { RdvService } from 'src/app/services/rdv.service';
import { Rdv } from 'src/app/models/Rdv';
import { AlimentationService } from 'src/app/services/alimentation.service';
import { Data } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Alimentation } from 'src/app/models/alimentation';
import { Operation } from 'src/app/models/operation';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;

  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  medicament$:Observable<Medicament[]>
  mydata$:Observable<Patient[]>
  poids$:Observable<Poids[]>
date:Date;
patient$:Observable<Patient[]>
users$: Observable<User[]>;
calories$:Observable<Calories[]>
rdv$:Observable<Rdv[]>
alimentation$:Observable<Alimentation[]>
operations$:Observable<Operation[]>




  constructor(private FicheService: FicheService,private RdvService: RdvService,private MedicamentService: MedicamentService,private PasService: PasService,private PatientService: PatientService,private PoidsService: PoidsService,private UserService:UserService ,private AlimenataionService: AlimentationService){}

  ngOnInit() {

    this.medicament$ = this.MedicamentService.fetchmymedicament();
    this.mydata$ = this.PatientService.mydata();
    this.date = new Date()
    this.patient$ = this.PatientService.fetchAllpatient();
    const id =parseInt(localStorage.getItem('id'));
    this.users$=this.UserService.findid(id);
    this.calories$ = this.PasService.fetchmycalories();
    this.rdv$ = this.RdvService.fetchAll();
    this.poids$ = this.PoidsService.fetchmy();
    this.alimentation$ = this.AlimenataionService.fetchAllAlimentation();
    this.operations$ = this.FicheService.fetchoperation();

    this.poids();



    //var ordersChart = new Chart(chartOrders, {
      //type: 'bar',
      //options: chartExample2.options,
      //data: chartExample2.data
    //});

    //var chartSales = document.getElementById('chart-sales');

    //this.salesChart = new Chart(chartSales, {
			//type: 'line',
			//options: chartExample1.options,
			//data: chartExample1.data
		//});
  }

  data: Data[];

  public lineChartData: ChartDataSets[] = [
    
    
  ];
  public lineChartLabels: Label[] = ['J-1', 'J-2', 'J-3', 'J-4', 'J-5', 'J-6', 'J-7'];
  
  public lineChartOptions: (ChartOptions ) = {
    
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'DodgerBlue0000',
      backgroundColor: 'rgb(0, 0, 255)',
    },
  ];
  public lineChartLegend = false;
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

  postid(): void {
  
    const email=localStorage.getItem('email');

    this.PatientService
      .postid(email);
      
      

     
  }

  
  fetchAllcalories():Observable<Calories[]>{
    return this.PasService.fetchAllcalories();
  }
  fetchmymedicament(): Observable<Medicament[]> {
    return this.MedicamentService.fetchmymedicament();
  }
  fetchAllpoids():Observable<Poids[]>{
    return this.PoidsService.fetchAll();
  }
  fetchAllpatient():Observable<Patient[]>{
    return this.PatientService.fetchAllpatient();
  }
  fetchAllrdv():Observable<Rdv[]>{
    return this.RdvService.fetchAll();
  }

  mydata():Observable<Patient[]>{
    return this.PatientService.mydata();
  }
  myoperation():Observable<Operation[]>{
    return this.FicheService.fetchoperation();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  fetchAllalimentation(): Observable<Alimentation[]> {
    return this.AlimenataionService.fetchmyAlimentation();
  }

 
}
