import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../homepage.component').then((c) => c.HomepageComponent),
  },
];
