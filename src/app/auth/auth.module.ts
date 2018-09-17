import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

@NgModule({

    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule, //ngIf y ngFor funcionan desde aqui
        FormsModule, //para que funcione los formularios normales de angular
        AngularFireAuthModule, //para el inicio de sesion con firebase
        RouterModule // tuve que importarlo para que me funcione el routerlink
    ]

})

export class AuthModule{

}