import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subs: Subscription = new Subscription();//para gestionar la subscription

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    console.log('navbar.component.ts Cargado');    

    this.subs = this.store.select('auth')
    .pipe( filter( auth => auth.user != null ))//para evitar que tome el valor de null al inicio
    .subscribe( auth => this.nombre = auth.user.nombre );
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
