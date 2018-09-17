import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducer';

//ya importo mi reducer de ingresoegreso aqui ya que se cargaria al inicio de la aplicacion y no cuando inicie sesion como lo estamos aplicando en esta app.
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState{
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui:fromUI.uiReducer,
    auth:fromAuth.authReducer,
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoReducer
};