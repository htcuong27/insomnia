import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BackgroundComponent } from './core/components/background/background';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'insomnia';
}
