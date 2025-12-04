import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class ResumeComponent implements OnInit {
  private apiService = inject(ApiService);
  private location = inject(Location);

  resume: any = null;

  ngOnInit() {
    this.apiService.getResume().subscribe({
      next: (data) => this.resume = data,
      error: (error) => console.error('Error loading resume:', error),
    });
  }

  goBack() {
    this.location.back();
  }
}
