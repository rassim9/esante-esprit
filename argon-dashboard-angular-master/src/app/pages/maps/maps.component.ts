import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from "rxjs/operators";
import { Options } from '@angular-slider/ngx-slider';



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

    value: number = 0;
    options: Options = {
      ceil: 8,
      floor: 0,
      showSelectionBar: true,
      showTicks: true,
      getTickColor: (value: number): string => {
        if (value < 3) {
          
          return 'green';
        }
        if (value <= 5) {
          return 'orange';
        }
        if (value > 5) {
          return 'red';
        }
        
        console.log(value);
        return '#2AE02A';
      }
    };
   

sliderEvent(value) {
    //alert(this.sliderValue);
    console.log(value);
    localStorage.setItem("niveau",value);
  
}





    checkCheckBoxvalue1(event):string{
     
      console.log(String(event.target.checked));
      localStorage.setItem("pansement",event.target.checked);
      return event.target.checked;
   }
   checkCheckBoxvalue2(event):string{
    console.log(String(event.target.checked));
    localStorage.setItem("medicament",event.target.checked);
    return event.target.checked;

 }
 checkCheckBoxvalue3(event):string{
  console.log(String(event.target.checked));
  localStorage.setItem("saignment",event.target.checked);
  return event.target.checked;

}
checkCheckBoxvalue4(event):string{
  console.log(String(event.target.checked));
  localStorage.setItem("douleur",event.target.checked);
  return event.target.checked;

}


    rangevalue = 37;
    
    getSliderValue(event):number {
      console.log(event.target.value);
       this.rangevalue = event.target.value;
      localStorage.setItem("temp",event.target.value);
      return event.target.value;
   }
    fetchAll(): Observable<Etat[]> {
      return this.etatService.fetchAll();
    }
    createFormGroup(): FormGroup {
      return new FormGroup({
        forme: new FormControl("", [Validators.required, Validators.minLength(5)]),
        description: new FormControl("", [Validators.required, Validators.minLength(10)]),
       
        
      });
    }

    onSubmit(formData : Pick<Etat, "forme" | "description">):void {
      console.log(formData);
      //this.etatService.createEtat(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
      this.createFormGroup();
      this.create();
      this.form.reset();
      this.etats$ = this.fetchAll();

    }
    create(): void {
      const id =localStorage.getItem('id');
      this.etatService.createEtat(this.form.value).subscribe((msg) => console.log(msg));  }
      
    delete(id: Pick<Etat, "id">): void{
      this.etatService.deleteEtat(id).subscribe(()=>(this.etats$ = this.fetchAll()))
    }
   


    
}
