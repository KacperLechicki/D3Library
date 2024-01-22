import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Subject } from 'rxjs';

export interface ChartsState {
  currentChart: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChartsStateService extends SignalsStoreService<ChartsState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }
}
