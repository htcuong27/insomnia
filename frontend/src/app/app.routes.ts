import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/shell/shell').then(m => m.ShellComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
      { path: 'blog', loadChildren: () => import('./features/blog/blog.routes').then(m => m.blogRoutes) },
      { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
      { path: 'projects', loadComponent: () => import('./features/projects/projects').then(m => m.ProjectsComponent) },
      { path: 'resume', loadComponent: () => import('./features/resume/resume').then(m => m.ResumeComponent) },
      { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.ContactComponent) },
      { path: 'pomodoro', loadComponent: () => import('./features/pomodoro/pomodoro').then(m => m.PomodoroComponent) },
      { path: 'photo', loadComponent: () => import('./shared/components/placeholder/placeholder').then(m => m.PlaceholderComponent) },
      { path: 'about', loadComponent: () => import('./shared/components/placeholder/placeholder').then(m => m.PlaceholderComponent) },
    ]
  },
  { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes) },
  { path: '**', redirectTo: 'home' }
];
