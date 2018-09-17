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

        //comente esta linea porque hay propiedades de LaziLoad que me ayudan a proteger mis rutas, usaremos esas
        // canActivate: [ AuthGuardService ]//para hacer funcionar mi servicio que me proteje las rutas
    }
];

@NgModule({
  imports: [
    //aqui no usamos el forRoot porque ya hay un archivo principal de rutas "app.routing", aqui seria forChild y le mando las rutas definidas arriba.
    RouterModule.forChild( routes )
  ],
  exports: [//las exporto para decirle a angular que ahora dispone de estas nuevas configuraciones de rutas
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
