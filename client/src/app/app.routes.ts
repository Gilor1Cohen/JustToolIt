import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'Tools',
    loadComponent: () =>
      import('./Components/tools-page/tools-page.component').then(
        (m) => m.ToolsPageComponent
      ),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
