import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';

@Component({
    selector: 'app-admin-project-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './project-form.html',
})
export class ProjectFormComponent implements OnInit {
    @Input() project: any = null;
    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    private projectsService = inject(ProjectsService);

    form!: FormGroup;
    loading = false;
    error = '';

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            title: [this.project?.title || '', Validators.required],
            description: [this.project?.description || '', Validators.required],
            technologies: [this.project?.technologies?.join(', ') || '', Validators.required],
            githubUrl: [this.project?.githubUrl || ''],
            liveUrl: [this.project?.liveUrl || ''],
            imageUrl: [this.project?.imageUrl || ''],
            featured: [this.project?.featured || false],
            order: [this.project?.order || 0]
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        this.loading = true;
        this.error = '';

        const formValue = this.form.value;
        // Convert technologies string to array
        const projectData = {
            ...formValue,
            technologies: formValue.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        };

        const request = this.project
            ? this.projectsService.updateProject(this.project.id, projectData)
            : this.projectsService.createProject(projectData);

        request.subscribe({
            next: () => {
                this.loading = false;
                this.save.emit();
            },
            error: (err) => {
                console.error('Error saving project:', err);
                this.error = 'Failed to save project. Please try again.';
                this.loading = false;
            }
        });
    }
}
