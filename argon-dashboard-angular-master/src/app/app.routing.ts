import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { Dashboard2Component } from 'src/app/pages/dashboard2/dashboard2.component';
import { IconsComponent } from 'src/app/pages/icons/icons.component';
import { MapsComponent } from 'src/app/pages/maps/maps.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';
import { RdvComponent } from 'src/app/pages/rdv/rdv.component';
import { AddEventComponent } from 'src/app/pages/add-event/add-event.component';
import { EmailComponent } from 'src/app/pages/email/email.component';
import { BoiteComponent } from 'src/app/pages/boite/boite.component';
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { RoleGuard } from './services/role.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { RoleadminGuard } from './services/roleadmin.guard';


const routes: Routes =[
  { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent ,canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent ,canActivate: [AuthGuard,RoleGuard] },
    { path: 'maps',           component: MapsComponent ,canActivate: [AuthGuard] },
    { path: 'rdv',           component: RdvComponent ,canActivate: [AuthGuard] },
    { path: 'addevent',           component: AddEventComponent ,canActivate: [AuthGuard,RoleGuard] },
    { path: 'email',           component: EmailComponent ,canActivate: [AuthGuard] },
    { path: 'boite',           component: BoiteComponent ,canActivate: [AuthGuard] },
    { path: 'faq',           component: FaqComponent ,canActivate: [AuthGuard] },
    { path: 'admin',           component: AdminComponent ,canActivate: [AuthGuard,RoleadminGuard] },
    { path: 'dashboard2',           component: Dashboard2Component  },
    

    
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
