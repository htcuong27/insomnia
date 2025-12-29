import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable } from 'rxjs';

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    avatar?: string;
    role: string;
}

export interface AccountStatus {
    verified: boolean;
    verifiedDate: string;
    twoFactorEnabled: boolean;
    securityLevel: string;
}

export interface PasswordUpdate {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private http = inject(HttpService);

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>('admin/profile');
    }

    updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
        return this.http.put<UserProfile>('admin/profile', profile);
    }

    getAccountStatus(): Observable<AccountStatus> {
        return this.http.get<AccountStatus>('admin/profile/status');
    }

    updatePassword(passwordData: PasswordUpdate): Observable<void> {
        return this.http.post<void>('admin/profile/password', passwordData);
    }

    uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
        const formData = new FormData();
        formData.append('avatar', file);
        return this.http.post<{ avatarUrl: string }>('admin/profile/avatar', formData);
    }

    removeAvatar(): Observable<void> {
        return this.http.delete<void>('admin/profile/avatar');
    }

    toggle2FA(enabled: boolean): Observable<AccountStatus> {
        return this.http.post<AccountStatus>('admin/profile/2fa', { enabled });
    }
}
