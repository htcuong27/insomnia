import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { DashboardData } from './models/dashboard';


import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);

  authService = inject(AuthService);
  dashboardData: DashboardData | null = null;
  loading = true;
  showSensitiveData = false;

  ngOnInit() {
    this.loadDashboardData();
  }

  toggleSensitiveData() {
    this.showSensitiveData = !this.showSensitiveData;
  }

  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardData().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.loading = false;
      },
    });
  }
}
