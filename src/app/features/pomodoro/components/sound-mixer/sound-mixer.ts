import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  isOpen = signal(false);

  sounds = signal<Sound[]>([
    {
      id: 'rain',
      name: 'Rain',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>',
      url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1609.mp3',
      volume: 0.5,
      isPlaying: false
    },
    {
      id: 'fire',
      name: 'Fire',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.115.385-2.256 1-3.24"/><path d="M12 14v2"/></svg>',
      url: 'https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3',
      volume: 0.5,
      isPlaying: false
    },
    {
      id: 'cafe',
      name: 'Cafe',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
      url: 'https://assets.mixkit.co/sfx/preview/mixkit-restaurant-crowd-talking-ambience-444.mp3',
      volume: 0.5,
      isPlaying: false
    }
  ]);

  toggleMixer() {
    this.isOpen.update(v => !v);
  }

  toggleSound(id: string) {
    this.sounds.update(sounds => {
      return sounds.map(s => {
        if (s.id === id) {
          if (s.isPlaying) {
            s.audio?.pause();
            return { ...s, isPlaying: false };
          } else {
            if (!s.audio) {
              s.audio = new Audio(s.url);
              s.audio.loop = true;
            }
            s.audio.volume = s.volume;
            s.audio.play();
            return { ...s, isPlaying: true };
          }
        }
        return s;
      });
    });
  }

  updateVolume(id: string, event: Event) {
    const volume = parseFloat((event.target as HTMLInputElement).value);
    this.sounds.update(sounds => {
      return sounds.map(s => {
        if (s.id === id) {
          if (s.audio) s.audio.volume = volume;
          return { ...s, volume };
        }
        return s;
      });
    });
  }
}
