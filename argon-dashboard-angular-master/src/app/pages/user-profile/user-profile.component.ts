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
  Users$: Observable<User[]>;



  constructor(private AuthService:AuthService,private UserService:UserService ) { }

  ngOnInit():void {
    const id=this.AuthService.getuserId();
    this.Users$=this.findid(id);
    }
    findid(id: number): Observable<User[]>  {
     return this.Users$ = this.UserService.findid(id);
      
    }

    
    

}
