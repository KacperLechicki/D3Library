import { createReducer, on } from '@ngrx/store';
import { toggleSidenav } from './sidenav.actions';

export interface SidenavState {
  opened: boolean;
}

export const initialState: SidenavState = { opened: false };

export const sidenavReducer = createReducer(
  initialState,
  on(
    toggleSidenav,
    (state: SidenavState): SidenavState => ({
      ...state,
      opened: !state.opened,
    })
  )
);
