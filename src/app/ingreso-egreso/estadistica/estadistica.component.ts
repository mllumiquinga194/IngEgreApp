import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<fromIngresoEgreso.AppState> ) { }

  ngOnInit() {
    console.log('estadistica.component.ts Cargado');

    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
      this.contarIngresoEgreso( ingresoEgreso.items );
    })
  }

  contarIngresoEgreso( items: IngresoEgreso[] ){

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    //cada uno de los elementos que vengan dentro del arreglo van a caer dentro de item

    items.forEach( item => {

      if ( item.tipo === 'Ingreso' ){
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.egresos, this.ingresos ];
  }

}
