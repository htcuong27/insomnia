import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { BackgroundService } from '../../../core/services/background.service';
import { environment } from '../../../../environments/environment.development';

const GUEST_NAV_ITEMS: NavItem[] = [
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Photo', path: '/photo' }, // Note: Route might not exist yet based on previous file view
  { label: 'About', path: '/about' }, // Note: Route might not exist yet
  { label: 'Contact', path: '/contact' },
  { label: 'Pomodoro', path: '/pomodoro' }
];

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

  navItems = signal(GUEST_NAV_ITEMS);
}

interface NavItem {
  label: string;
  path: string;
}

