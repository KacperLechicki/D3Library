import { Component } from '@angular/core';
import { ButtonComponent } from '../../controls/button/button.component';
import { AsyncPipe } from '@angular/common';
import { PopoverModule } from '@coreui/angular';
import { SidenavStateService } from '../../../store/sidenav/sidenav-state.service';
import { ThemePopoverComponent } from './components/theme-popover/theme-popover.component';

@Component({
  selector: 'sh-topbar',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe, ThemePopoverComponent, PopoverModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  protected readonly logoPath = 'assets/logo/logo.png';
  protected sidenavOpen = this.sidenavStateService.select('opened');

  constructor(private sidenavStateService: SidenavStateService) {}

  protected toggleSidenav(): void {
    this.sidenavStateService.set('opened', !this.sidenavOpen());
  }
}
