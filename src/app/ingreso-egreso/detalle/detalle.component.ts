import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];//un arreglo de tipo IngresoEgreso[] (de mi modelo) para guardar cada items
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>, 
               public _insgresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    console.log('detalle.component.ts Cargado');

    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {

      console.log( ingresoEgreso.items );

      this.items = ingresoEgreso.items;
      
    });
  }

  ngOnDestroy(){//destruir subscripcion
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ){//funcion para borar item

    this._insgresoEgresoService.borrarIngresoEgreso( item.uid ).then( () => {
      Swal('Eliminado', item.descripcion, 'success' );
    }).catch();

  }



}
