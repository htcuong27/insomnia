import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private http = inject(HttpService);

    getProjects() {
        return this.http.get<any[]>('/projects');
    }

    getBlogs(published = true) {
        return this.http.get<any[]>('/blogs?published=' + published);
    }

    getBlogBySlug(slug: string) {
        return this.http.get<any>('/blogs/' + slug);
    }

    getResume() {
        return this.http.get<any>('/resume');
    }

}
