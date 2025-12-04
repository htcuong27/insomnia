import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  socialLinks = environment.socialLinks;
  projects: any[] = [];
  blogs: any[] = [];

  ngOnInit() {
    this.loadProjects();
    this.loadBlogs();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        // Show only featured or first 3 projects
        this.projects = projects.filter((p: any) => p.featured).slice(0, 3) || projects.slice(0, 3);
      },
      error: (error) => console.error('Error loading projects:', error),
    });
  }

  loadBlogs() {
    this.apiService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs.slice(0, 3);
      },
      error: (error) => console.error('Error loading blogs:', error),
    });
  }
}
