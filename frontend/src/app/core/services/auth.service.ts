import { Injectable, inject, signal } from '@angular/core';
import { Auth, User, signInWithPopup, GoogleAuthProvider, signInAnonymously, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role?: 'USER' | 'ADMIN' | 'GUEST';
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = inject(Auth);
    private router = inject(Router);

    currentUser = signal<AppUser | null>(null);
    currentIdToken = signal<string | null>(null);
    isAuthenticated = signal<boolean>(false);
    isAdmin = signal<boolean>(false);

    constructor() {
        // Listen to auth state changes
        onAuthStateChanged(this.auth, (firebaseUser) => {
            if (firebaseUser) {
                this.setUser(firebaseUser);
                this.setIdToken();
            } else {
                this.clearUser();
            }
        });
    }

    private async setIdToken() {
        const user = this.auth.currentUser;
        if (!user) return;
        this.currentIdToken.set(await user.getIdToken());
    }

    private async setUser(firebaseUser: User) {
        // Get ID token and check role
        const idTokenResult = await firebaseUser.getIdTokenResult();
        const role = (idTokenResult.claims['role'] as string) || 'USER';

        this.currentUser.set({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: role as 'USER' | 'ADMIN' | 'GUEST',
        });

        this.isAuthenticated.set(true);
        this.isAdmin.set(role === 'ADMIN');
    }

    private clearUser() {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        this.isAdmin.set(false);
    }

    getIdToken(): string | null {
        return this.currentIdToken();
    }

    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(this.auth, provider);
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    }

    async signInAsGuest() {
        try {
            await signInAnonymously(this.auth);
        } catch (error) {
            console.error('Anonymous sign-in error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
            this.router.navigate(['/home']);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}
