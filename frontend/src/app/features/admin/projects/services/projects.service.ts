import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private http = inject(HttpService);

    createProject(project: any) {
        return this.http.post<any>('projects', project);
    }

    updateProject(id: string, project: any) {
        return this.http.put<any>(`projects/${id}`, project);
    }

    deleteProject(id: string) {
        return this.http.delete<any>(`projects/${id}`);
    }

    getProjects() {
        return this.http.get<any[]>('projects');
    }
}