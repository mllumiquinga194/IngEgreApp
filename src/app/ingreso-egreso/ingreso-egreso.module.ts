import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,//quite el SharedModule de mi app.module porque solo lo uso desde mi ingreso-egreso.module por eso lo coloqué aqui.
    DashboardRoutingModule,//para cargar la configuracion de las rutas hijas.

    //esto seria mi equivalente a la constante que tengo en app.reducer donde le agrego los otros reducers para exportarlos en una sola constante al app.module. como aqui estoy modularizando toda mi app y este reducer lo voy a necesitar en este modulo, y no es mi modulo principal, entonces lo utilizo asi: "StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducer)" de esta manera y no como en app.module que lo uso asi: StoreModule.forRoot(appReducers),. utilizando la constante de reducers.
    StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducer)//el forFeature es para expandir mi store actual
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
