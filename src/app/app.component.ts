import { AfterViewInit, Component } from '@angular/core';
import { TopbarComponent } from './shared/components/common/topbar/topbar.component';
import { SidenavComponent } from './shared/components/common/sidenav/sidenav.component';
import { BootstrapStateService } from './shared/services/bootstrap-state.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, SidenavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  readonly title = 'd3-library';

  constructor(private bootstrapStateService: BootstrapStateService) {}

  ngAfterViewInit(): void {
    this.bootstrapStateService.bootstrap();
  }
}
