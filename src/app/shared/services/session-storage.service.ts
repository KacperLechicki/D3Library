import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public fromSessionStorage<T>(key: string): T | undefined {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return JSON.parse(sessionStorage.getItem(`d3-lib__${key}`) as string);
    }

    return undefined;
  }

  public toSessionStorage<T>(key: string, value: T): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(`d3-lib__${key}`, JSON.stringify(value));
    }
  }
}
