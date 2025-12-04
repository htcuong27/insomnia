import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  dashboardData: any = null;

  async ngOnInit() {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => this.dashboardData = data,
      error: (error) => console.error('Error loading dashboard:', error),
    });
  }
}
