import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { AudioService } from '../../services/audio.service';

interface Sound {
  id: string;
  name: string;
  icon: string;
  url: string;
  volume: number;
  isPlaying: boolean;
  audio?: HTMLAudioElement;
}

@Component({
  selector: 'app-sound-mixer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sound-mixer.html',
  styleUrl: './sound-mixer.scss'
})
export class SoundMixerComponent {
  isOpen = model<'soundMixer' | 'musicPlayer' | 'backgroundSelector' | null>(null);
  audioService = inject(AudioService);

  toggleMixer() {
    this.isOpen.update(v => v === 'soundMixer' ? null : 'soundMixer');
  }

  onWhiteNoiseVolumeChange(id: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.audioService.setWhiteNoiseVolume(id, parseFloat(value));
  }
}
