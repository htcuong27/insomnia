import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { BackgroundService } from '../../../core/services/background.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class ShellComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  backgroundService = inject(BackgroundService);

  currentYear = new Date().getFullYear();
  socialLinks = environment.socialLinks;
}
