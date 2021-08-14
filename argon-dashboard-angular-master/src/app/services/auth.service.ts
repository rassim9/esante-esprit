import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';

import { first,catchError, tap } from 'rxjs/operators';
import { User } from "../models/User";
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
    private url = "http://localhost:3000/auth";
  
    isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
    userId: Pick<User, "id">;
    nom :string;
    
  
    httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
  
    constructor(
      private http: HttpClient,
      private errorHandlerService: ErrorHandlerService,
      private router: Router
    ) {}
  
    signup(user: Omit<User, "id">): Observable<User> {
      return this.http
        .post<User>(`${this.url}/signup`, user, this.httpOptions)
        .pipe(
          first(),
          catchError(this.errorHandlerService.handleError<User>("signup"))
        );
    }
    signupm(user: Omit<User, "id">): Observable<User> {
      return this.http
        .post<User>(`${this.url}/signupm`, user, this.httpOptions)
        .pipe(
          first(),
          catchError(this.errorHandlerService.handleError<User>("signupm"))
        );
    }
  
    login(
      email: Pick<User, "email">,
      password: Pick<User, "password">
    ): Observable<{
      token: string;
      userId: Pick<User, "id">;
    }> {
      return this.http
        .post(`${this.url}/login`, { email, password }, this.httpOptions)
        .pipe(first(),
          tap((tokenObject: { token: string;userId: Pick<User, "id">,role: string}) =>{
            this.userId = tokenObject.userId;
            localStorage.setItem("token",tokenObject.token);
           // console.log(this.userId.id);
            const  s=this.userId.id;

            //localStorage.setItem("email",);
            this.isUserLoggedIn$.next(true);
           
            const token = localStorage.getItem('token');
            console.log(token);
            console.log(email);
            console.log(tokenObject.role);
            localStorage.setItem("role",String(tokenObject.role));
            localStorage.setItem("email",String(email));
            console.log(this.userId);
            localStorage.setItem("id",String(this.userId));
            let Role = localStorage.getItem("role");
    if (Role == "medecin"){
      this.router.navigate(["icons"]);
    }
    else if (Role == "admin"){
      this.router.navigate(["admin"]);

    }
    else {
      this.router.navigate(["dashboard"]);
    }

          }),
          catchError(
            this.errorHandlerService.handleError<{
              token: string;
              userId: Pick<User, "id">;
            }>("login")
          )
        );
    }
    getinfo():string{
      if (this.isUserLoggedIn$ )
      {
        return this.nom= "nnnnnn"
      
      }
    }
    getuserId(){
     //localStorage.setItem("id",this.getuserId());
      return this.userId.id;

    }
   
  }
  