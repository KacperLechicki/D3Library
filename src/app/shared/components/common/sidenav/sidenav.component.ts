import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  effect,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { SidenavStateService } from '../../../store/sidenav/sidenav-state.service';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';

@Component({
  selector: 'sh-sidenav',
  standalone: true,
  imports: [AsyncPipe, NgClass, SidenavItemComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @ViewChild('sidenav', { read: ElementRef }) sidenav!: ElementRef<HTMLElement>;
  @Output() sidenavWidth = new EventEmitter<number>();

  protected sidenavOpen = this.sidenavStateService.select('opened');
  protected readonly logoPath = 'assets/logo/logo.png';

  constructor(private sidenavStateService: SidenavStateService) {}

  private _sidenavOpenChange = effect((): void => {
    if (this.sidenavOpen()) {
      setTimeout((): void => {
        const width = this.sidenav.nativeElement.offsetWidth;
        this.sidenavWidth.emit(width);
      }, 800);
    } else {
      this.sidenavWidth.emit(0);
    }
  });
}
