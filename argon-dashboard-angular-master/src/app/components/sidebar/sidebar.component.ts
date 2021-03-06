import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Patients',  icon:'ni-planet text-blue', class: '' },
    { path: '/dashboard2', title: 'info',  icon:'ni-bullet-list-67 text-yellow', class: '' },
    { path: '/maps', title: 'Etat',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/rdv', title: 'Rdv',  icon:'ni-calendar-grid-58 text-blue', class: '' },
    { path: '/faq', title: 'FAQ',  icon:'fa fa-info-circle', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn)=>{
      this.isAuthenticated = isLoggedIn;
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(): void{
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);


  }
}
