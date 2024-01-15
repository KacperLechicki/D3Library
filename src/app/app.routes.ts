import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/homepage/routes/homepage.routes').then((c) => c.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
