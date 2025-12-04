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
        ]
    }
];