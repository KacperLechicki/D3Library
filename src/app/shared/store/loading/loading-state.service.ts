import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Subject } from 'rxjs';

export interface LoadingState {
  busy: boolean;
  loadingScreen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService extends SignalsStoreService<LoadingState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }
}
