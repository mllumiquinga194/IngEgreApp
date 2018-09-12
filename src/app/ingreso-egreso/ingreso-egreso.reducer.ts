import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.action';
import { IngresoEgreso } from './ingreso-egreso.model';

//Interface de como va a funcionar ingreso y egreso. la apariencia de mi estado. mi interfaz va a serr una gran coleccion de items
export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function IngresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {

    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map( item => { //barro todo el arreglo de items que vienen en la accion y al pasarlo por el operador map voy a barrerlos uno por uno y devuelvo un nuevo elemento.
                        return {
                            ...item
                        };
                    })
                ]
            }
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            }
        default:
            return state;
    }
}