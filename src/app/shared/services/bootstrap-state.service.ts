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
      const primaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--primary-color');
      const secondaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--secondary-color');
      const tertiaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--tertiary-color');

      const themeFromStorage =
        this.sessionStorageService.fromSessionStorage<ThemeState>(
          'theme'
        ) as ThemeState;

      this.themeStateService.setState({
        theme: (themeFromStorage.theme as Theme) || Theme.LIGHT,
        primary: (themeFromStorage.primary as string) || primaryColor,
        secondary: (themeFromStorage.secondary as string) || secondaryColor,
        tertiary: (themeFromStorage.tertiary as string) || tertiaryColor,
      });
    }
  }

  private _sidenavState(): void {
    this.sidenavStateService.setState({
      opened: false,
    });
  }
}
