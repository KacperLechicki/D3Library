import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Subject } from 'rxjs';

export interface RouterState {
  currentRoute: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouterStateService extends SignalsStoreService<RouterState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }
}
