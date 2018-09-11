import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuardService } from "./auth/auth-guard.service";


const routes: Routes = [
    { path: 'login', component:LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: '', 
        component: DashboardComponent, //asi defino rutas hijas.
        children: dashboardRoutes,
        canActivate: [ AuthGuardService ]//para hacer funcionar mi servicio que me proteje las rutas
    },
    { path: '**', redirectTo: '' }
];
@NgModule({

    imports:[
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}