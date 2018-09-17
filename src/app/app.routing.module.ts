import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuardService } from "./auth/auth-guard.service";


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: '',//Solamente va a entrar aqui y cargar el modulo si el usuario esta correctamente autenticado.
        loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',//el loadChildren me habilita el LazyLoad y le mando el path relativo donde esta el modulo a cargar y le indico explicitamente que modulo va a cargar

        //Si el AuthGuardService se cumple, entonces si podra ver y acceder el resto de las rutas y este modulo
        canLoad: [ AuthGuardService ]//esto es lo que me permite realmente bloquear la entrada de alguien que no este autenticada
        //se podia usar el canActive si el modulo ya estuviera cargado pero como lo vamos a cargar unicamente si el usuario esta identificado entonces usamos el canLoad de LazyLoad
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