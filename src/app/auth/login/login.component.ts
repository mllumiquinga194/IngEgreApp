import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscripcion: Subscription = new Subscription();//esta subscripcion me va a permitir llamar el onsubscribe cuando se destruya este componente

  constructor( public _authService: AuthService,
               public store: Store<AppState> ) { }

  ngOnInit() {
    console.log('login.component.ts Cargardo');
    
    //this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading ); //como esto se llama cada vez que ingreso al login, es bueno manejar una subscripcion para evitar fugas de memorias u otras cosas.
    this.subscripcion= this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );//este subscripcion yo tengo que destruirlo cuando este componente deje de existir (entiendo que es cuando vaya a otro componente). para eso llamo al onDestroy
  }

  ngOnDestroy(){

    this.subscripcion.unsubscribe();//para destruir la subscripcion del store
  }

  onSubmit( data: any ){
    this._authService.login( data.email, data.password );
  }

}
