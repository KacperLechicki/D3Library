import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { SidenavStateService } from '../../../store/sidenav/sidenav-state.service';

@Component({
  selector: 'sh-sidenav',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  protected sidenavOpen = this.sidenavStateService.select('opened');
  protected readonly logoPath = 'assets/logo/logo.png';

  constructor(private sidenavStateService: SidenavStateService) {}
}
