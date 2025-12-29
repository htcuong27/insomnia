import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable } from 'rxjs';

export interface Contact {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    status: 'Active' | 'Inactive' | 'Away';
    avatar?: string;
    avatarColor?: string;
    isEmoji?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpService);

    getContacts(params?: { search?: string; company?: string; status?: string }): Observable<Contact[]> {
        let endpoint = 'admin/contacts';
        if (params) {
            const queryParams = new URLSearchParams();
            if (params.search) queryParams.append('search', params.search);
            if (params.company) queryParams.append('company', params.company);
            if (params.status) queryParams.append('status', params.status);
            const queryString = queryParams.toString();
            if (queryString) endpoint += `?${queryString}`;
        }
        return this.http.get<Contact[]>(endpoint);
    }

    getContact(id: number): Observable<Contact> {
        return this.http.get<Contact>(`admin/contacts/${id}`);
    }

    createContact(contact: Partial<Contact>): Observable<Contact> {
        return this.http.post<Contact>('admin/contacts', contact);
    }

    updateContact(id: number, contact: Partial<Contact>): Observable<Contact> {
        return this.http.put<Contact>(`admin/contacts/${id}`, contact);
    }

    deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`admin/contacts/${id}`);
    }
}
