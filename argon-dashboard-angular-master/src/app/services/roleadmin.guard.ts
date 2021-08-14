import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleadminGuard implements CanActivate {
  canActivate(){
    let Role = localStorage.getItem("role");
    if ( Role=="admin") {
      return true;
    }
    alert("Interface Admin");
    return false;
    
      
  }
  
}
