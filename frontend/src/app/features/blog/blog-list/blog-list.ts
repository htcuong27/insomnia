import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogListComponent implements OnInit {
  private apiService = inject(ApiService);

  blogs: any[] = [];

  ngOnInit() {
    this.apiService.getBlogs(true).subscribe({
      next: (data) => this.blogs = data,
      error: (error) => console.error('Error loading blogs:', error),
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
