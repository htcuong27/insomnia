import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-[#0a0e1a]">
      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 h-screen w-64 bg-[#0f1419] border-r border-gray-800 flex flex-col z-40">
        <!-- Logo -->
        <div class="p-6 border-b border-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-white">Insomnia Admin</div>
              <div class="text-xs text-gray-400">v2.4.0</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path" 
               routerLinkActive="bg-[#1e2936] text-white"
               [routerLinkActiveOptions]="{exact: false}"
               class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1e2936] hover:text-white transition-all duration-200 group">
              <svg class="w-5 h-5" [innerHTML]="item.icon"></svg>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </a>
          }
        </nav>

        <!-- Bottom Navigation -->
        <div class="p-4 border-t border-gray-800 space-y-1">
          <a [routerLink]="'/admin/profile'" 
             routerLinkActive="bg-[#1e2936] text-white"
             [routerLinkActiveOptions]="{exact: false}"
             class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1e2936] hover:text-white transition-all duration-200 group">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-sm font-medium">Profile</span>
          </a>
          <a [routerLink]="'/admin/settings'" 
             routerLinkActive="bg-[#1e2936] text-white"
             [routerLinkActiveOptions]="{exact: false}"
             class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1e2936] hover:text-white transition-all duration-200 group">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            </svg>
            <span class="text-sm font-medium">Settings</span>
          </a>
          <button (click)="authService.logout()"
                  class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1e2936] hover:text-white transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col ml-64">
        <!-- Top Bar -->
        <header class="bg-[#0f1419] border-b border-gray-800 px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <input type="text" placeholder="Search..." 
                     class="w-96 px-4 py-2 bg-[#1e2936] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors">
            </div>
            <div class="flex items-center gap-4">
              <button class="p-2 rounded-xl hover:bg-[#1e2936] transition-colors relative">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <div class="flex items-center gap-3 pl-4 border-l border-gray-800">
                @if (authService.currentUser()?.photoURL) {
                  <img [src]="authService.currentUser()?.photoURL" alt="User" class="w-10 h-10 rounded-full object-cover">
                } @else {
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {{ authService.currentUser()?.displayName?.charAt(0)?.toUpperCase() || 'A' }}
                  </div>
                }
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-8">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AdminShellComponent {
  authService = inject(AuthService);

  navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" fill="none" stroke="currentColor" />'
    },
    {
      label: 'Chatbot',
      path: '/admin/chatbot',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" fill="none" stroke="currentColor" />'
    },
    {
      label: 'Projects',
      path: '/admin/projects',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" fill="none" stroke="currentColor" />'
    },
    {
      label: 'Blogs',
      path: '/admin/blog',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" fill="none" stroke="currentColor" />'
    },
    {
      label: 'Contact',
      path: '/admin/contact',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" fill="none" stroke="currentColor" />'
    },
    {
      label: 'Photos',
      path: '/admin/photos',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" fill="none" stroke="currentColor" />'
    },
  ];
}
