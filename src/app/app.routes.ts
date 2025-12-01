import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pomodoro',
    pathMatch: 'full'
  },
  {
    path: 'pomodoro',
    loadComponent: () => import('./features/pomodoro/pomodoro').then(m => m.PomodoroComponent)
  },
];
