import { Component, OnInit } from '@angular/core';
//import Chart from 'chart.js';
import ms from "ms";
import { Observable } from 'rxjs';
import { Medicament } from 'src/app/models/medicament';
import { Patient } from 'src/app/models/Patient';
import { MedicamentService } from 'src/app/services/medicament.service';
import { PatientService } from 'src/app/services/patient.service';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  medicament$:Observable<Medicament[]>
  mydata$:Observable<Patient[]>



  constructor(private MedicamentService: MedicamentService,private PatientService: PatientService){}

  ngOnInit() {

    this.medicament$ = this.MedicamentService.fetchmymedicament();
    this.mydata$ = this.PatientService.mydata();


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    //parseOptions(Chart, chartOptions());


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
  fetchmymedicament(): Observable<Medicament[]> {
    return this.MedicamentService.fetchmymedicament();
  }

  mydata():Observable<Patient[]>{
    return this.PatientService.mydata();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
