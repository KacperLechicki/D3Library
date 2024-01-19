import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { LoadingStateService } from '../store/loading/loading-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(
    private router: Router,
    private loadingStateService: LoadingStateService
  ) {}

  public interceptRouteChanges(): void {
    this.router.events
      .pipe(
        distinctUntilChanged(),
        filter(
          (event): boolean =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        )
      )
      .subscribe((event): void => {
        if (event instanceof NavigationStart) {
          this._startLoading();
        } else if (event instanceof NavigationEnd) {
          this._stopLoading();
        }
      });
  }

  private _startLoading(): void {
    this.loadingStateService.setState({
      busy: true,
    });
  }

  private _stopLoading(): void {
    setTimeout((): void => {
      this.loadingStateService.setState({
        busy: false,
      });
    }, 700);
  }
}
