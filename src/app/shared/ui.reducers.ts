import * as fromUI from './ui.actions';

//cual va a ser el estado de mi UI, o la parte del interfaz de usuario?
// como en un futuro es probable que agreguye mas cosas, seria bueno tratarlo como un objeto
export interface State{
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
}

export function uiReducer ( state = initState, action: fromUI.acciones): State {//en este ejemplo siempre devolvere un State tipo objeto

    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            }
    
        default:
            return state;
    }
}