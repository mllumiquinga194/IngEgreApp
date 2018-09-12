import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  nombre: string;
  subs: Subscription = new Subscription();//para gestionar la subscription

  constructor( public _authService: AuthService,
               public _ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState> ) { }

  ngOnInit() {
    console.log('sidebar.component.ts Cargado');

    this.subs = this.store.select('auth')
    .pipe( filter( auth => auth.user != null ))//para evitar que tome el valor de null al inicio
    .subscribe( auth => this.nombre = auth.user.nombre );
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  logout(){
    this._authService.logout();
    this._ingresoEgresoService.cancelarSubscription();

  }

}
