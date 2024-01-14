import { Component } from '@angular/core';
import { TopbarComponent } from './shared/components/common/topbar/topbar.component';
import { SidenavComponent } from './shared/components/common/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title = 'd3-library';
}
