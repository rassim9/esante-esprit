import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { first } from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup ;
  signupmForm: FormGroup ;

  constructor(private authService :AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
    this.signupmForm= this.createFormGroupm();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,Validators.minLength(7),]),
      taille: new FormControl("",Validators.required ),
      poids: new FormControl("",Validators.required ),
      age: new FormControl("", Validators.required),
      tel: new FormControl("",Validators.required ),
      sexe: new FormControl("", ),
      adresse: new FormControl("",Validators.required ),
    });
  }
  signup(): void {

this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg));  }




createFormGroupm(): FormGroup {
  return new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required,Validators.minLength(7),]),
    
    tel: new FormControl("",Validators.required ),
    sexe: new FormControl("", ),

  });
}
signupm(): void {

this.authService.signupm(this.signupmForm.value).subscribe((msg) => console.log(msg));  }

}
