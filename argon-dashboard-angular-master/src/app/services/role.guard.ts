import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(){
    let Role = localStorage.getItem("role");
    if (Role == "Medecin" || Role=="admin") {
      return true;
    }
    alert("Pour les medecins seulement");
    return false;
    
      
  }
  
}
