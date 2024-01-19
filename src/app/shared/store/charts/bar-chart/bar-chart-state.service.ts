import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SignalsStoreService } from '../../signals-store.service';

export interface BarChartState {
  data: any;
  config: {};
  constants: {
    margin: { top: number; right: number; bottom: number; left: number };
  };
}

@Injectable({
  providedIn: 'root',
})
export class BarChartStateService extends SignalsStoreService<BarChartState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }
}
