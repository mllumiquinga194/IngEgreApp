import * as fromUI from './shared/ui.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ui: fromUI.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui:fromUI.uiReducer
};