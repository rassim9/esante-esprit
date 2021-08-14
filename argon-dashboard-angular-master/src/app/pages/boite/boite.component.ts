import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-boite',
  templateUrl: './boite.component.html',
  styleUrls: ['./boite.component.css']
})
export class BoiteComponent implements OnInit {

  email$:Observable<Email[]>
  myemail$:Observable<Email[]>



  constructor(private emailService:EmailService) { }

  ngOnInit(): void {
    this.email$ = this.emailService.fetchAll();
    this.myemail$ = this.emailService.myAll();


  }
  fetchAll():Observable<Email[]>{
    return this.emailService.fetchAll();
  }
  myAll():Observable<Email[]>{
    return this.emailService.myAll();
  }

  delete(id: number): void {
    this.email$ = this.emailService
      .delete(id)
      .pipe(tap(() => (this.email$ = this.fetchAll())));
  }


}
