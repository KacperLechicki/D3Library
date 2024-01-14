import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';

export interface SidenavState {
  opened: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidenavStateService extends SignalsStoreService<SidenavState> {
  constructor() {
    super({
      opened: false,
    });
  }
}
