import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Theme } from '../../interfaces/theme.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

export interface ThemeState {
  mode: Theme;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeStateService extends SignalsStoreService<ThemeState> {
  private renderer!: Renderer2;
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    super({
      mode: Theme.LIGHT,
    });

    this.renderer = rendererFactory.createRenderer(null, null);

    //Side Effects
    this.watchModeChanges();
  }

  //Side Effects
  private watchModeChanges(): void {
    const mode$ = toObservable(this.select('mode'));

    mode$
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
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
