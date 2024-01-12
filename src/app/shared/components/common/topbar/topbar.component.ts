import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Renderer2,
} from '@angular/core';
import { ButtonComponent } from '../../controls/button/button.component';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { toggleSidenav } from '../sidenav/store/sidenav.actions';
import { selectSidenavOpen } from '../sidenav/store/sidenav.selectors';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'sh-topbar',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  protected readonly logoPath = 'assets/logo/logo.png';
  protected readonly sidenavOpen$ = this.store.select(selectSidenavOpen);
  private mode = 'dark';

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  protected handleTool(event: string): void {
    if (event === 'theme') {
      this.mode === 'dark' ? (this.mode = 'light') : (this.mode = 'dark');
      this.mode === 'light'
        ? this.renderer.setAttribute(
            this.document.documentElement,
            'data-theme',
            'dark'
          )
        : this.renderer.setAttribute(
            this.document.documentElement,
            'data-theme',
            'light'
          );
    } else if (event === 'toggle') {
      this.store.dispatch(toggleSidenav());
    }
  }
}
