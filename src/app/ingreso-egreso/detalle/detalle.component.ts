import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    console.log('detalle.component.ts Cargado');

    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {

      console.log( ingresoEgreso.items );

      this.items = ingresoEgreso.items;
      
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  borrarItem( uid: string ){
    console.log(uid);
  }



}
