import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { ProjectFormComponent } from './project-form/project-form';
import { ProjectsService } from './services/projects.service';

@Component({
    selector: 'app-admin-projects',
    standalone: true,
    imports: [CommonModule, ProjectFormComponent],
    templateUrl: './projects.html',
})
export class AdminProjectsComponent implements OnInit {
    private projectService = inject(ProjectsService);

    projects: any[] = [];
    loading = true;
    showForm = false;
    selectedProject: any = null;

    ngOnInit() {
        this.loadProjects();
    }

    loadProjects() {
        this.loading = true;
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.projects = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                this.loading = false;
            },
        });
    }

    onAdd() {
        this.selectedProject = null;
        this.showForm = true;
    }

    onEdit(project: any) {
        this.selectedProject = project;
        this.showForm = true;
    }

    onDelete(project: any) {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            this.projectService.deleteProject(project.id).subscribe({
                next: () => {
                    this.loadProjects();
                },
                error: (error) => {
                    console.error('Error deleting project:', error);
                    alert('Failed to delete project.');
                }
            });
        }
    }

    onFormSave() {
        this.showForm = false;
        this.loadProjects();
    }

    onFormCancel() {
        this.showForm = false;
        this.selectedProject = null;
    }
}
