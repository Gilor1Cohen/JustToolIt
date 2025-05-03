import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { toolsMap } from './Core/Mapping/ToolsMap';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/Pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },

  {
    path: 'Pricing',
    loadComponent: () =>
      import('./Components/Pages/pricing-page/pricing-page.component').then(
        (m) => m.PricingPageComponent
      ),
  },

  {
    path: 'FAQs',
    loadComponent: () =>
      import('./Components/Pages/faqs-page/faqs-page.component').then(
        (m) => m.FAQsPageComponent
      ),
  },
  {
    path: 'Terms-Of-Service',
    loadComponent: () =>
      import(
        './Components/Pages/terms-of-service/terms-of-service.component'
      ).then((m) => m.TermsOfServiceComponent),
  },

  {
    path: 'Privacy-Policy',
    loadComponent: () =>
      import('./Components/Pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },

  {
    path: 'SignUp',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Components/Pages/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },

  {
    path: 'LogIn',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Components/Pages/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    path: 'ChoosePlan',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Components/Pages/choose-plan/choose-plan.component').then(
        (m) => m.ChoosePlanComponent
      ),
  },
  {
    path: 'Profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Components/Pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
  },
  {
    path: 'Tools',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './Components/Pages/ToolsPages/tools-categories/tools-categories.component'
          ).then((m) => m.ToolsCategoriesComponent),
      },
      {
        path: ':category',
        loadComponent: () =>
          import(
            './Components/Pages/ToolsPages/tools-categories-details/tools-categories-details.component'
          ).then((m) => m.ToolsCategoriesDetailsComponent),
      },

      ...Object.entries(toolsMap).map(([slug, loader]) => ({
        path: `:category/${slug}`,
        loadComponent: loader,
      })),
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
