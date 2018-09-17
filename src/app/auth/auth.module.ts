import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
// import { AppRoutingModule } from '../app.routing.module';
import { RouterModule} from '@angular/router';

@NgModule({

    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule // tuve que importarlo para que me funcione el routerlink
    ]

})

export class AuthModule{

}