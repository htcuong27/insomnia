import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { AppUser } from '../models/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';

    currentUser = signal<AppUser | null>(null);
    isAuthenticated = signal<boolean>(false);
    isAdmin = signal<boolean>(false);

    constructor() {
        this.loadUserFromStorage();
    }

    login(credentials: { username: string; password: string }) {
        return this.http.post<{ access_token: string; user: any }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                this.setSession(response);
                this.router.navigate(['/admin']);
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        this.isAdmin.set(false);
        this.router.navigate(['/home']);
    }

    private setSession(authResult: { access_token: string; user: any }) {
        localStorage.setItem(this.tokenKey, authResult.access_token);
        localStorage.setItem(this.userKey, JSON.stringify(authResult.user));

        this.currentUser.set(authResult.user);
        this.isAuthenticated.set(true);
        this.isAdmin.set(authResult.user.role === 'ADMIN');
    }

    private loadUserFromStorage() {
        const token = localStorage.getItem(this.tokenKey);
        const userStr = localStorage.getItem(this.userKey);

        if (token && userStr) {
            const user = JSON.parse(userStr);
            this.currentUser.set(user);
            this.isAuthenticated.set(true);
            this.isAdmin.set(user.role === 'ADMIN');
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
