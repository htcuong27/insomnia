import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss'
})
export class MusicPlayerComponent {
  isOpen = signal(false);
  videoUrl: SafeResourceUrl;

  // Lofi Girl stream
  private readonly defaultVideoId = 'jfKfPfyJRdk';

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.defaultVideoId}?autoplay=1`
    );
  }

  togglePlayer() {
    this.isOpen.update(v => !v);
  }
}
