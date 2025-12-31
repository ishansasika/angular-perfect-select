import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'playground/:componentId',
    loadComponent: () => import('./pages/playground/playground.component').then(m => m.PlaygroundComponent)
  },
  {
    path: 'playground',
    redirectTo: 'playground/select',
    pathMatch: 'full'
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs.component').then(m => m.DocsComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
