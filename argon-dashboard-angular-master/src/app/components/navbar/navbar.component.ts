import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from "src/app/models/User";
import { first,catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, timer } from "rxjs";





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  name= this.authService.getinfo;

   

  constructor(private authService: AuthService,location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

dateTime: Observable<Date>;
  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(()=> {
        return new Date()
      })
    )
    
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout(): void{
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);


  }

}
