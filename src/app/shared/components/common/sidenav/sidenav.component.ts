import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { selectSidenavOpen } from './store/sidenav.selectors';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'sh-sidenav',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  protected sidenavOpen$: Observable<boolean> =
    this.store.select(selectSidenavOpen);

  constructor(private store: Store<AppState>) {}
}
