import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900">
      <div class="max-w-md w-full">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-display font-bold mb-3 text-gray-900 dark:text-white">Admin Access</h1>
          <p class="text-gray-600 dark:text-gray-400">Please sign in to continue to the admin dashboard.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
          <button (click)="signIn()" 
                  class="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    async signIn() {
        try {
            await this.authService.signInWithGoogle();
            if (this.authService.isAdmin()) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/home']);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    }
}
