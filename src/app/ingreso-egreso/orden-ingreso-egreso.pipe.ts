import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items: any ): IngresoEgreso {

    return items.sort( ( a ) => {

      if( a.tipo === 'Ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
