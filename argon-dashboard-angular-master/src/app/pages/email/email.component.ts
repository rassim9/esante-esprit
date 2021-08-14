import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Email } from 'src/app/models/email';
import { EmailService } from '../../services/email.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  form: FormGroup ;
  users$:Observable<User[]>


  constructor(private emailservices: EmailService, private userservice : UserService ) { }

  ngOnInit(): void {
    this.form = this.createFormGroup();
    this.users$ = this.userservice.findall();

  }

  fetchAll():Observable<User[]>{
    return this.userservice.findall();
   
  }
  

  createFormGroup(): FormGroup {
    return new FormGroup({
      dest: new FormControl("", [Validators.required, Validators.minLength(5)]),
      object: new FormControl("", [Validators.required, Validators.minLength(5)]),
      message: new FormControl("", [Validators.required, Validators.minLength(10)]),
    });
  }
  onSubmit(formData : Pick<Email, "dest" |"object" |"message">):void {
    console.log(formData);
    //this.PatientService.createPatient(formData,this.authService.userId).pipe(first()).subscribe((msg)=>console.log(msg));
    this.createFormGroup();
    this.sendmail();
    this.form.reset();

  }
  sendmail(): void {

    this.emailservices.sendemail(this.form.value).subscribe((msg) => console.log(msg));  }
    
}


