import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopbarComponent } from './shared/components/common/topbar/topbar.component';
import { SidenavComponent } from './shared/components/common/sidenav/sidenav.component';
import { BootstrapStateService } from './shared/services/bootstrap-state.service';
import { RouterOutlet } from '@angular/router';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  startWith,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from './shared/services/loading.service';
import { LoadingStateService } from './shared/store/loading/loading-state.service';
import { LoadingComponent } from './shared/components/common/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TopbarComponent,
    SidenavComponent,
    RouterOutlet,
    AsyncPipe,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  public readonly title = 'd3-library';
  protected sidenavWidth = 0;
  protected loadingBusy = this.loadingStateService.select('busy');

  private readonly desktopBreakpoint = 1200;

  constructor(
    private bootstrapStateService: BootstrapStateService,
    private loadingService: LoadingService,
    private loadingStateService: LoadingStateService
  ) {}

  ngOnInit(): void {
    this.loadingService.interceptRouteChanges();
  }

  ngAfterViewInit(): void {
    this.bootstrapStateService.bootstrap();
  }

  protected isDesktop(): Observable<boolean> {
    if (typeof window !== 'undefined') {
      return fromEvent(window, 'resize').pipe(
        debounceTime(500),
        map(() => this.getScreenSize()),
        distinctUntilChanged(),
        startWith(this.getScreenSize())
      );
    }

    return of(false);
  }

  private getScreenSize(): boolean {
    return (
      window.innerWidth > this.desktopBreakpoint && window.innerWidth < 2300
    );
  }
}
