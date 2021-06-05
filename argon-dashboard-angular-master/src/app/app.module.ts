import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';








import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CreateEtatComponent } from './pages/create-etat/create-etat.component';

import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { IconsComponent } from 'src/app/pages//icons/icons.component';
import { MapsComponent } from 'src/app/pages//maps/maps.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/pages/tables/tables.component';
import { RdvComponent } from 'src/app/pages/rdv/rdv.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './pages/add-event/add-event.component';
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FullCalendarModule,
   

    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    IconsComponent,
    MapsComponent,
    UserProfileComponent,
    TablesComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RdvComponent,
    AddEventComponent,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
