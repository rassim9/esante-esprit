import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service" 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

canActivate(): Observable<boolean>{
  const token = localStorage.getItem('token');
  if (!token ) {
    this.router.navigate(["login"]);
  }
  this.authService.isUserLoggedIn$.next(true);
  return this.authService.isUserLoggedIn$;
}
}
