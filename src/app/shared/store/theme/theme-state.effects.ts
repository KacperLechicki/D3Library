import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Theme } from '../../interfaces/theme.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeStateEffects {
  private renderer!: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public watchModeChanges(
    mode$: Observable<Theme>,
    destroyed$: Subject<void>
  ): void {
    mode$
      .pipe(distinctUntilChanged(), takeUntil(destroyed$))
      .subscribe((mode: Theme) => {
        if (mode === Theme.LIGHT) {
          this.renderer.setAttribute(
            this.document.documentElement,
            'data-theme',
            Theme.LIGHT
          );
        } else {
          this.renderer.setAttribute(
            this.document.documentElement,
            'data-theme',
            Theme.DARK
          );
        }
      });
  }
}
