import { AfterViewInit, Component } from '@angular/core';
import { TopbarComponent } from './shared/components/common/topbar/topbar.component';
import { SidenavComponent } from './shared/components/common/sidenav/sidenav.component';
import { BootstrapStateService } from './shared/services/bootstrap-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, SidenavComponent],
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
