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
    path: 'Terms-Of-Service',
    loadComponent: () =>
      import('./Components/terms-of-service/terms-of-service.component').then(
        (m) => m.TermsOfServiceComponent
      ),
  },

  {
    path: 'Privacy-Policy',
    loadComponent: () =>
      import('./Components/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },

  {
    path: 'SignUp',
    loadComponent: () =>
      import('./Components/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },

  {
    path: 'LogIn',
    loadComponent: () =>
      import('./Components/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    path: 'ChoosePlan',
    loadComponent: () =>
      import('./Components/choose-plan/choose-plan.component').then(
        (m) => m.ChoosePlanComponent
      ),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
