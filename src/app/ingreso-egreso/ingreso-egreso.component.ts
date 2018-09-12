import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;//formulario
  tipo = 'ingreso';//para saber si es ingreso o egreso.
  loadingSubs: Subscription = new Subscription();//para mostrarlo cuando cargue el ingreso-egreso
  cargando: boolean;

  constructor(public _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {
    console.log('ingreso-egreso.component.ts Cargado');

    this.loadingSubs = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', Validators.min(1))
    });
  }

  ngOnDestroy() {

    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {//en la base de datos. me apoyo en mi _ingresoEgresoService

    this.store.dispatch(new ActivarLoadingAction());//disparo mi loading cuando yo le de click a crear ingreso egreso

    const ingresoEgreso = new IngresoEgreso({//tomo los valores del formulario y del boton ingreso o egreso
      ...this.forma.value, tipo: this.tipo //...this.forma.value con esto tomo los valores
    });

    this._ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {//llamo el metodo del servicio

      this.forma.reset({//reseteo el formuilario
        monto: 0
      });
      this.store.dispatch(new DesactivarLoadingAction());//disparo la accion de desactivar el loading
      Swal('Creado', ingresoEgreso.descripcion, 'success');//mando mi mensaje de success. todo salio bien

    }).catch(err => {
      this.store.dispatch(new DesactivarLoadingAction());//si todo salio mal, igual detengo el loading
      console.error(err);

    });
  }

}
