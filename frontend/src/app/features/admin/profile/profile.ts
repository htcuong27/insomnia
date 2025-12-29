import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './profile.html',
})
export class AdminProfileComponent implements OnInit {
    authService = inject(AuthService);

    profile = {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@nexus.com',
        phone: '+1 (555) 000-1234',
        bio: 'Managing the Nexus dashboard operations and overseeing project developments across multiple departments.',
        avatar: '👤',
        role: 'Senior System Administrator'
    };

    accountStatus = {
        verified: true,
        verifiedDate: 'Jan 12, 2023',
        twoFactorEnabled: true,
        securityLevel: 'High'
    };

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.profile.email = user.email || this.profile.email;
            if (user.displayName) {
                const names = user.displayName.split(' ');
                this.profile.firstName = names[0] || 'Admin';
                this.profile.lastName = names.slice(1).join(' ') || 'User';
            }
        }
    }

    saveChanges() {
        console.log('Saving profile changes:', this.profile);
    }
}
