import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Subject } from 'rxjs';

export interface SidenavState {
  opened: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidenavStateService extends SignalsStoreService<SidenavState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }
}
