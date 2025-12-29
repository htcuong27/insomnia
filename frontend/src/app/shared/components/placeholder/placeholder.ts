import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-placeholder',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 class="text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">Coming Soon</h1>
      <p class="text-gray-600 dark:text-gray-400">This page is under construction.</p>
    </div>
  `
})
export class PlaceholderComponent { }
