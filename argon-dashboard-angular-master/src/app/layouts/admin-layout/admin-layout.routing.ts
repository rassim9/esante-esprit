import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AddEventComponent } from '../../pages/add-event/add-event.component';
import { EmailComponent } from '../../pages/email/email.component';
import { BoiteComponent } from '../../pages/boite/boite.component';


import { RdvComponent } from '../../pages/rdv/rdv.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AuthInterceptorService } from "src/app/services/auth-interceptor.service";
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { RoleGuard } from 'src/app/services/role.guard';
import { AdminComponent } from 'src/app/pages/admin/admin.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent, },
    { path: 'maps',           component: MapsComponent },
    { path: 'rdv',           component: RdvComponent },
    { path: 'addevent',           component: AddEventComponent, },
    { path: 'email',           component: EmailComponent },
    { path: 'boite',           component: BoiteComponent },
    { path: 'faq',           component: FaqComponent },
    { path: 'admin',           component: AdminComponent }


    
];
