import { Routes } from "@angular/router";
import { AdminShellComponent } from "./admin-shell";
import { DashboardComponent } from "./dashboard/dashboard";

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminShellComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'chatbot', loadComponent: () => import('./chatbot/chatbot').then(m => m.AdminChatbotComponent) },
            { path: 'projects', loadComponent: () => import('./projects/projects').then(m => m.AdminProjectsComponent) },
            { path: 'blog', loadComponent: () => import('./blog/blog').then(m => m.AdminBlogComponent) },
            { path: 'contact', loadComponent: () => import('./contact/contact').then(m => m.AdminContactComponent) },
            { path: 'photos', loadComponent: () => import('./photos/photos').then(m => m.AdminPhotosComponent) },
            { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.AdminProfileComponent) },
            { path: 'settings', loadComponent: () => import('../../shared/components/placeholder/placeholder').then(m => m.PlaceholderComponent) },
        ]
    }
];