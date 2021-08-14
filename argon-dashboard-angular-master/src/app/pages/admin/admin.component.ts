import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { User } from 'src/app/models/User';
import { UserService} from 'src/app/services/user.service';
import { PatientService} from 'src/app/services/patient.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users$: Observable<User[]>;
  Patients$: Observable<Patient[]>;




  constructor(private UserService: UserService,private PatientService: PatientService ) { }

  ngOnInit(): void {
    this.users$=this.fetchAll();
    this.Patients$=this.fetchAllp();
  }


  fetchAll(): Observable<User[]> {
    return this.UserService.findall();
  }
  fetchAllp(): Observable<Patient[]> {
    return this.PatientService.fetchAll();
  }
}
