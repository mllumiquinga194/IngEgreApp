import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  cargando: boolean = false;

  constructor( public _authService: AuthService,
               public store: Store<AppState>) { }

  ngOnInit() {
    console.log('register.component.ts Cargardo');
    //this.cargando este cargando lo podremos utilizar en el HTML
    this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  onSubmit( data: any ){
    console.log(data);
    this._authService.crearUsuario( data.name, data.email, data.password );
    this.cargando = true;
  }

}
