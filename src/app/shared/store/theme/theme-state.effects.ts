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

        root.style.setProperty('--primary-color', theme.primary || '#4589f7');
        root.style.setProperty(
          '--secondary-color',
          theme.secondary || '#4ebcd5'
        );
        root.style.setProperty('--tertiary-color', theme.tertiary || '#3f51b6');

        root.style.setProperty(
          '--primary-color-rgb',
          theme.primary ? toRGB(theme.primary) : '69, 137, 247'
        );
        root.style.setProperty(
          '--secondary-color-rgb',
          theme.secondary ? toRGB(theme.secondary) : '78, 188, 213'
        );
        root.style.setProperty(
          '--tertiary-color-rgb',
          theme.tertiary ? toRGB(theme.tertiary) : '63, 81, 182'
        );

        this.sessionStorageService.toSessionStorage<ThemeState>('theme', theme);
      });
  }
}
