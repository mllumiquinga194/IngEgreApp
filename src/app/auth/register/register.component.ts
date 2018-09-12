import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { log } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscripcion: Subscription = new Subscription();//esta subscripcion me va a permitir llamar el onsubscribe cuando se destruya este componente


  constructor( public _authService: AuthService,
               public store: Store<AppState>) { }

  ngOnInit() {
    console.log('register.component.ts Cargardo');
    //this.cargando este cargando lo podremos utilizar en el HTML
    // this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
    this.subscripcion= this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
    
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();//para destruir la subscripcion del store
  }

  onSubmit( data: any ){
    this._authService.crearUsuario( data.name, data.email, data.password );
  }

}
