import { User } from "./user.model";
import { Action } from "@ngrx/store";

export const SET_USER = '[AUTH] Set User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    //este User es el modelo que tenemos en user.model
    constructor ( public user: User ){ }
}

export type acciones =  SetUserAction;