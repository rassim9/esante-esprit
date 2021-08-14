import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  users$: Observable<User[]>;

  constructor(private UserService:UserService ) { }

  ngOnInit():void {
    const id =parseInt(localStorage.getItem('id'));
    this.users$=this.UserService.findid(id);
    }


    findid(id): Observable<User[]>  {
     return this.UserService.findid(id);
      
    }

    

}
