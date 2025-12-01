import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-audio-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-controls.html',
  styleUrl: './audio-controls.scss'
})
export class AudioControlsComponent {
  audioService = inject(AudioService);
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onFlipVolumeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.audioService.setFlipVolume(parseFloat(value));
  }

  onWhiteNoiseVolumeChange(id: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.audioService.setWhiteNoiseVolume(id, parseFloat(value));
  }
}
