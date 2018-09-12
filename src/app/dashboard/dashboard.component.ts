import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( public _ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    console.log('dashboard.component.ts Cargardo');
    //de esta manera voy a lanzar la solicitud al servicio  de leer todos los items
    this._ingresoEgresoService.initIngresoEgresoListener();
  }

}
