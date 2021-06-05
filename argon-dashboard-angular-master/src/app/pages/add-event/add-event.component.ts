import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RdvService } from '../../services/rdv.service';
import { Rdv } from 'src/app/models/Rdv';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  rdv$: Observable<Rdv[]>;
  form: FormGroup ;

  constructor(private rdvService: RdvService,private router: Router ) { }
  ngOnInit():void {
    this.form = this.createFormGroup();
   
    }

    createFormGroup(): FormGroup {
      return new FormGroup({
        title: new FormControl("", [Validators.required, Validators.minLength(5)]),
        date: new FormControl("", ),
        p2: new FormControl("", [Validators.required, Validators.minLength(1)]),
      });
    }
  onSubmit(formData : Pick<Rdv, "title" | "date" |"p2">):void {
    console.log(formData);
    //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
    this.createFormGroup();
    this.create();
    this.form.reset();
    this.router.navigate(['/rdv']);

  }
  create(): void {

    this.rdvService.createRdv(this.form.value).subscribe((msg) => console.log(msg));  }
    
}




