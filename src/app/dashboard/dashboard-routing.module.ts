import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
      { 
        path: '', 
        component: DashboardComponent, //asi defino rutas hijas.
        children: dashboardRoutes
        // canActivate: [ AuthGuardService ]//para hacer funcionar mi servicio que me proteje las rutas
    }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
