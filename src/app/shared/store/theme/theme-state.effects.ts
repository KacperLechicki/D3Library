import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { Theme } from '../../interfaces/theme.interface';
import { DOCUMENT } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { ThemeState } from './theme-state.service';
import { toRGB } from '../../functions/toRGB';

@Injectable({
  providedIn: 'root',
})
export class ThemeStateEffects {
  private renderer!: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private sessionStorageService: SessionStorageService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public watchModeChanges(
    theme$: Observable<ThemeState>,
    destroyed$: Subject<void>
  ): void {
    theme$
      .pipe(distinctUntilChanged(), takeUntil(destroyed$), debounceTime(200))
      .subscribe((theme: ThemeState): void => {
        const chosenTheme =
          theme.theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK;
        this.renderer.setAttribute(
          this.document.documentElement,
          'data-theme',
          chosenTheme
        );

        const root = this.document.documentElement;

        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--tertiary-color', theme.tertiary);

        root.style.setProperty('--primary-color-rgb', toRGB(theme.primary));
        root.style.setProperty('--secondary-color-rgb', toRGB(theme.secondary));
        root.style.setProperty('--tertiary-color-rgb', toRGB(theme.tertiary));

        this.sessionStorageService.toSessionStorage<ThemeState>('theme', theme);
      });
  }
}
