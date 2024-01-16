import { Injectable } from '@angular/core';
import {
  ThemeState,
  ThemeStateService,
} from '../store/theme/theme-state.service';
import { Theme } from '../interfaces/theme.interface';
import { SidenavStateService } from '../store/sidenav/sidenav-state.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BootstrapStateService {
  constructor(
    private themeStateService: ThemeStateService,
    private sidenavStateService: SidenavStateService,
    private sessionStorageService: SessionStorageService
  ) {}

  public bootstrap(): void {
    this._themeState();
    this._sidenavState();
  }

  private _themeState(): void {
    if (typeof window !== 'undefined') {
      const themeFromStorage =
        this.sessionStorageService.fromSessionStorage<ThemeState>(
          'theme'
        ) as ThemeState;

      this.themeStateService.setState({
        theme: themeFromStorage
          ? (themeFromStorage.theme as Theme)
          : Theme.LIGHT,
        primary: themeFromStorage
          ? (themeFromStorage.primary as string)
          : '#4589f7',
        secondary: themeFromStorage
          ? (themeFromStorage.secondary as string)
          : '#4ebcd5',
        tertiary: themeFromStorage
          ? (themeFromStorage.tertiary as string)
          : '#3f51b6',
      });
    }
  }

  private _sidenavState(): void {
    this.sidenavStateService.setState({
      opened: false,
    });
  }
}
