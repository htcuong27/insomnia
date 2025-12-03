import { Injectable, signal, effect, inject } from '@angular/core';
import { WeatherService } from './weather.service';
import { AudioService } from '../../features/pomodoro/services/audio.service';

export type BackgroundType = 'particles' | 'rain' | 'snow' | 'leaves' | 'stars';

@Injectable({
    providedIn: 'root'
})
export class BackgroundService {
    activeBackground = signal<BackgroundType>('particles');
    isRealTimeMode = signal(false);

    // Theme colors
    private readonly dayGradient = 'linear-gradient(to bottom right, #60a5fa, #3b82f6)';
    private readonly nightGradient = 'linear-gradient(to bottom right, #0f172a, #1e293b)';
    currentGradient = signal(this.nightGradient);

    private weatherService = inject(WeatherService);
    private audioService = inject(AudioService);

    constructor() {
        effect(() => {
            if (this.isRealTimeMode()) {
                this.updateRealTimeState();
            } else {
                // Reset to default night theme when disabling real-time mode
                this.currentGradient.set(this.nightGradient);
            }
        });
    }

    setBackground(type: BackgroundType) {
        this.activeBackground.set(type);
        // If user manually sets background, disable real-time mode
        if (this.isRealTimeMode()) {
            this.isRealTimeMode.set(false);
        }
    }

    toggleRealTimeMode() {
        this.isRealTimeMode.update(v => !v);
        if (this.isRealTimeMode()) {
            this.initRealTimeUpdates();
        }
    }

    private initRealTimeUpdates() {
        console.log('Initializing real-time updates...');
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Got location:', position.coords);
                    this.weatherService.fetchWeather(position.coords.latitude, position.coords.longitude)
                        .subscribe({
                            next: (weather) => {
                                console.log('Got weather:', weather);
                                this.weatherService.weather.set(weather);
                                this.updateRealTimeState();
                            },
                            error: (err) => console.error('Error fetching weather:', err)
                        });
                },
                (error) => {
                    console.error('Error getting location', error);
                    this.isRealTimeMode.set(false);
                }
            );
        } else {
            console.error('Geolocation not supported');
            this.isRealTimeMode.set(false);
        }
    }

    private updateRealTimeState() {
        const weather = this.weatherService.weather();
        if (!weather) return;

        // Update gradient based on time
        this.currentGradient.set(weather.isDay ? this.dayGradient : this.nightGradient);

        // Update background and sound based on weather
        if (weather.isRaining) {
            this.activeBackground.set('rain');
            this.ensureRainSound(true);
        } else {
            // If not raining, default to particles or stars based on time
            this.activeBackground.set(weather.isDay ? 'particles' : 'stars');
            this.ensureRainSound(false);
        }
    }

    private ensureRainSound(shouldPlay: boolean) {
        const rainSound = this.audioService.whiteNoises().find(n => n.id === 'rain');
        if (rainSound) {
            if (shouldPlay && !rainSound.enabled) {
                this.audioService.toggleWhiteNoise('rain');
            } else if (!shouldPlay && rainSound.enabled) {
                this.audioService.toggleWhiteNoise('rain');
            }
        }
    }
}
