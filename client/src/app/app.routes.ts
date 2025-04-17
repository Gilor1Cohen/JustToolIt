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

  {
    path: 'Pricing',
    loadComponent: () =>
      import('./Components/pricing-page/pricing-page.component').then(
        (m) => m.PricingPageComponent
      ),
  },

  {
    path: 'FAQs',
    loadComponent: () =>
      import('./Components/faqs-page/faqs-page.component').then(
        (m) => m.FAQsPageComponent
      ),
  },

  {
    path: 'Profile',
    loadComponent: () =>
      import('./Components/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
  },

  {
    path: 'GetStarted',
    loadComponent: () =>
      import('./Components/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
