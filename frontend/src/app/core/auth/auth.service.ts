import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface User {
    email: string;
    name: string;
    picture: string;
    google_id: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/auth';
    currentUser = signal<User | null>(null);

    constructor(private http: HttpClient) {
        // Check local storage for existing session if needed
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.currentUser.set(JSON.parse(storedUser));
        }
    }

    googleLogin(credential: string) {
        return this.http.post<{ data: User[] }>(`${this.apiUrl}/google`, { credential }).pipe(
            tap(response => {
                const user = response.data[0];
                this.currentUser.set(user);
                localStorage.setItem('user', JSON.stringify(user));
            })
        );
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('user');
    }
}
