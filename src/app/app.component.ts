import { AfterViewInit, Component } from '@angular/core';
import { TopbarComponent } from './shared/components/common/topbar/topbar.component';
import { SidenavComponent } from './shared/components/common/sidenav/sidenav.component';
import { BootstrapStateService } from './shared/services/bootstrap-state.service';
import { RouterOutlet } from '@angular/router';
import { Observable, debounceTime, fromEvent, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, SidenavComponent, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  public readonly title = 'd3-library';
  protected sidenavWidth = 0;

  private readonly desktopBreakpoint = 1200;

  constructor(private bootstrapStateService: BootstrapStateService) {}

  ngAfterViewInit(): void {
    this.bootstrapStateService.bootstrap();
  }

  protected isDesktop(): Observable<boolean> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(500),
      startWith(this.getScreenSize()),
      map(() => this.getScreenSize())
    );
  }

  private getScreenSize(): boolean {
    return window.innerWidth > this.desktopBreakpoint;
  }
}
