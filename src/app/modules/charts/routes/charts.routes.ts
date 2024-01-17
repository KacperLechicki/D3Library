import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../charts.component').then((c) => c.ChartsComponent),
    children: [],
  },
];
