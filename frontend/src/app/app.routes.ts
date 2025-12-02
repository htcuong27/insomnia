import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pomodoro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'pomodoro',
    loadComponent: () => import('./features/pomodoro/pomodoro').then(m => m.PomodoroComponent)
  },
];
