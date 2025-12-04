import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-shell',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <router-outlet />
      </div>
    </div>
  `,
})
export class AdminShellComponent { }
