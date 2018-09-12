import * as fromAuth from './auth.action';
import { User } from './user.model';

//creamos la interface que esto va a manejar
//aqui va todo lo que consideremos que necesitara o estara relacionado con el usuario logeado
export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer (state = estadoInicial, action : fromAuth.acciones ):AuthState{

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {
                    ...action.user
                }
            }
        case fromAuth.UNSET_USER:
            return{
                user: null
            }
    
        default:
            return state;
    }
}