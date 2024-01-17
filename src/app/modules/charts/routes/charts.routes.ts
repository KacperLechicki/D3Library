import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../charts.component').then((c) => c.ChartsComponent),
    children: [
      {
        path: '',
        redirectTo: 'bar-chart',
        pathMatch: 'full',
      },
      {
        path: 'bar-chart',
        loadComponent: () =>
          import('../pages/bar-chart/bar-chart.component').then(
            (c) => c.BarChartComponent
          ),
      },
    ],
  },
];
