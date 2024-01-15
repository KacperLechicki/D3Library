import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Theme } from '../../interfaces/theme.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { ThemeStateEffects } from './theme-state.effects';

export interface ThemeState {
  theme: Theme;
  primary: string;
  secondary: string;
  tertiary: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeStateService extends SignalsStoreService<ThemeState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor(private themeStateEffects: ThemeStateEffects) {
    super();

    //Side Effects
    this.themeStateEffects.watchModeChanges(
      toObservable(this.state),
      this.destroyed$
    );
  }
}
