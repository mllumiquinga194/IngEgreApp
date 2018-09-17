import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modulos
import { AppRoutingModule } from './app.routing.module';

//NGrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//environments
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

//Modulos Personalizados
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [//todo lo que termine con Module va en los imports
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule,//estos ultimos tres son de angularfire2. recuerda instalar npm install firebase @angular/fire --save y actualizar los environments
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
