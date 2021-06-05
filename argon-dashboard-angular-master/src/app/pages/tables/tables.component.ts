import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pesage } from 'src/app/models/Pesage';

import { Poids } from 'src/app/models/Poids';
import { PesageListCrudService } from 'src/app/services/pesage-list-crud.service';
import { Pas } from 'src/app/models/Pas';
import { PasService } from 'src/app/services/pas.service';

import { PoidsService } from 'src/app/services/poids.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  pesages$:Observable<Pesage[]>
  poids$:Observable<Poids[]>
  pas$:Observable<Pas[]>

  constructor(private pesageListCrudService: PesageListCrudService, private PoidsService: PoidsService,private PasService: PasService) { }

  ngOnInit():void {
    this.pesages$ = this.pesageListCrudService.fetchAll();
    this.poids$ = this.PoidsService.fetchAll();
    this.pas$ = this.PasService.fetchAll();
  }
  fetchAll():Observable<Pesage[]>{
    return this.pesageListCrudService.fetchAll();
  }
  fetchAllpoids():Observable<Poids[]>{
    return this.PoidsService.fetchAll();
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
  







}
