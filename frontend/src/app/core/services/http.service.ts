import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl = environment.apiUrl;
    private authService = inject(AuthService);
    private http = inject(HttpClient);
    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        });
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() });
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() });
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }
}
