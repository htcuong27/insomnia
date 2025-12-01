import { Injectable, signal } from '@angular/core';

export interface WhiteNoise {
  id: string;
  name: string;
  icon: string;
  url: string;
  audio?: HTMLAudioElement;
  volume: number;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // Flip sound
  private flipAudio: HTMLAudioElement | null = null;
  flipEnabled = signal(true);
  flipVolume = signal(0.3);

  // White noise tracks
  whiteNoises = signal<WhiteNoise[]>([
    {
      id: 'rain',
      name: 'Rain',
      icon: '🌧️',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/13/audio_257112e3bb.mp3',
      volume: 0.5,
      enabled: false
    },
    {
      id: 'ocean',
      name: 'Ocean',
      icon: '🌊',
      url: 'https://cdn.pixabay.com/download/audio/2022/06/07/audio_c2c6c0c559.mp3',
      volume: 0.5,
      enabled: false
    },
    {
      id: 'forest',
      name: 'Forest',
      icon: '🌲',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4e5d5d7c4e.mp3',
      volume: 0.5,
      enabled: false
    },
    {
      id: 'fire',
      name: 'Fire',
      icon: '🔥',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c2c0d33e8d.mp3',
      volume: 0.5,
      enabled: false
    },
    {
      id: 'cafe',
      name: 'Cafe',
      icon: '☕',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_4037a62cb7.mp3',
      volume: 0.5,
      enabled: false
    }
  ]);

  constructor() {
    // Initialize flip sound (using a simple beep sound)
    this.flipAudio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3');
    this.flipAudio.volume = this.flipVolume();

    // Initialize white noise audio elements
    this.initializeWhiteNoises();
  }

  private initializeWhiteNoises() {
    const noises = this.whiteNoises();
    noises.forEach(noise => {
      noise.audio = new Audio(noise.url);
      noise.audio.loop = true;
      noise.audio.volume = noise.volume;
    });
    this.whiteNoises.set([...noises]);
  }

  // Play flip sound
  playFlipSound() {
    if (this.flipEnabled() && this.flipAudio) {
      this.flipAudio.currentTime = 0;
      this.flipAudio.volume = this.flipVolume();
      this.flipAudio.play().catch(err => console.log('Audio play failed:', err));
    }
  }

  // Toggle flip sound
  toggleFlipSound() {
    this.flipEnabled.update(v => !v);
  }

  // Set flip volume
  setFlipVolume(volume: number) {
    this.flipVolume.set(volume);
    if (this.flipAudio) {
      this.flipAudio.volume = volume;
    }
  }

  // Toggle white noise
  toggleWhiteNoise(id: string) {
    const noises = this.whiteNoises();
    const noise = noises.find(n => n.id === id);

    if (noise && noise.audio) {
      noise.enabled = !noise.enabled;

      if (noise.enabled) {
        noise.audio.play().catch(err => console.log('Audio play failed:', err));
      } else {
        noise.audio.pause();
      }

      this.whiteNoises.set([...noises]);
    }
  }

  // Set white noise volume
  setWhiteNoiseVolume(id: string, volume: number) {
    const noises = this.whiteNoises();
    const noise = noises.find(n => n.id === id);

    if (noise && noise.audio) {
      noise.volume = volume;
      noise.audio.volume = volume;
      this.whiteNoises.set([...noises]);
    }
  }

  // Stop all white noises
  stopAllWhiteNoises() {
    const noises = this.whiteNoises();
    noises.forEach(noise => {
      if (noise.audio && noise.enabled) {
        noise.audio.pause();
        noise.enabled = false;
      }
    });
    this.whiteNoises.set([...noises]);
  }

  // Cleanup
  destroy() {
    this.stopAllWhiteNoises();
    if (this.flipAudio) {
      this.flipAudio.pause();
      this.flipAudio = null;
    }
  }
}
