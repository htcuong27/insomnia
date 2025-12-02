import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

declare const google: any;

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        // Initialize Google Sign-In
        // Use a timeout to ensure the script is loaded
        setTimeout(() => {
            if (typeof google !== 'undefined') {
                google.accounts.id.initialize({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE', // Replace with actual Client ID
                    callback: (response: any) => this.handleCredentialResponse(response)
                });
                google.accounts.id.renderButton(
                    document.getElementById('googleBtn'),
                    { theme: 'outline', size: 'large', width: '250' }
                );
            }
        }, 1000);
    }

    handleCredentialResponse(response: any) {
        this.ngZone.run(() => {
            this.authService.googleLogin(response.credential).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (err) => console.error('Login failed', err)
            });
        });
    }
}
