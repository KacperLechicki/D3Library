import { createSelector } from '@ngrx/store';
import { SidenavState } from './sidenav.reducer';
import { AppState } from '../../../../store/app.state';

const selectSidenavFeature = (state: AppState): SidenavState => state.sidenav;

export const selectSidenavOpen = createSelector(
  selectSidenavFeature,
  (state: SidenavState): boolean => state.opened
);
