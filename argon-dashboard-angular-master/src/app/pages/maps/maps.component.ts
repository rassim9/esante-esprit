import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from "rxjs/operators";


import { Etat } from 'src/app/models/Etat';
import { User } from 'src/app/models/User';

import { EtatService} from 'src/app/services/etat.service';
import { AuthService} from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  form: FormGroup ;

etats$: Observable<Etat[]>;
userId: Pick<User, "id">;
  constructor(private etatService: EtatService, private authService: AuthService ) { }

  ngOnInit():void {
    this.form = this.createFormGroup();
    this.etats$=this.fetchAll();
    this.userId = this.authService.userId;
    }

    fetchAll(): Observable<Etat[]> {
      return this.etatService.fetchAll();
    }
    createFormGroup(): FormGroup {
      return new FormGroup({
        forme: new FormControl("", [Validators.required, Validators.minLength(5)]),
        desc: new FormControl("", [Validators.required, Validators.minLength(10)]),
      });
    }

    onSubmit(formData : Pick<Etat, "forme" | "desc">):void {
      console.log(formData);
      //this.etatService.createEtat(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
      this.createFormGroup();
      this.create();
      this.form.reset();
      this.etats$ = this.fetchAll();

    }
    create(): void {

      this.etatService.createEtat(this.form.value,this.authService.userId).subscribe((msg) => console.log(msg));  }
      
    delete(etatId: Pick<Etat, "id">): void{
      this.etatService.deleteEtat(etatId).subscribe(()=>(this.etats$ = this.fetchAll()))
    }
    
    
}
