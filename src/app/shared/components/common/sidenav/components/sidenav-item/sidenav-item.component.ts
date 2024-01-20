import { Component, ElementRef, Input, ViewChild, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEventPattern,
} from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
import { SidenavStateService } from '../../../../../store/sidenav/sidenav-state.service';

@Component({
  selector: 'sh-sidenav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav-item.component.html',
  styleUrl: './sidenav-item.component.scss',
})
export class SidenavItemComponent {
  @Input() path = '';
  @Input() label = '';

  @ViewChild('labelContainerRef', { static: false })
  labelContainerRef!: ElementRef;
  @ViewChild('labelRef', { static: false })
  labelRef!: ElementRef;

  private _subscriptions = new Subscription();
  private sidenavOpen = this.sidenavStateService.select('opened');

  constructor(private sidenavStateService: SidenavStateService) {
    const resizeObservable = fromEventPattern(
      (handler: NodeEventHandler): ResizeObserver => {
        const observer = new ResizeObserver(handler);
        observer.observe(this.labelContainerRef.nativeElement);
        return observer;
      },
      (handler: NodeEventHandler, observer: ResizeObserver): void =>
        observer.disconnect()
    );

    effect((): void => {
      if (this.sidenavOpen()) {
        setTimeout((): void => {
          this._subscriptions.add(
            resizeObservable
              .pipe(debounceTime(200), distinctUntilChanged())
              .subscribe((): void => this.checkOverflow())
          );

          this.checkOverflow();
        }, 1000);
      } else {
        setTimeout((): void => {
          const labelRef = this.labelRef.nativeElement;
          labelRef.classList.remove('label-overflowed');
          this._subscriptions.unsubscribe();
        }, 1000);
      }
    });
  }

  private checkOverflow(): void {
    const labelContainerRef = this.labelContainerRef.nativeElement;
    const labelRef = this.labelRef.nativeElement;

    if (labelRef.offsetWidth > labelContainerRef.offsetWidth) {
      labelRef.classList.add('label-overflowed');
    } else {
      labelRef.classList.remove('label-overflowed');
    }
  }
}
