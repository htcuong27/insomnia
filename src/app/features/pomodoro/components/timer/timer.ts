import { Component, computed, signal, effect, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss'
})
export class TimerComponent implements OnDestroy {
  private audioService = inject(AudioService);
  // Configuration
  modes = {
    focus: { label: 'Focus', minutes: 25 },
    shortBreak: { label: 'Short Break', minutes: 5 },
    longBreak: { label: 'Long Break', minutes: 15 }
  };

  // State
  currentMode = signal<TimerMode>('focus');
  timeLeft = signal(25 * 60); // in seconds
  isRunning = signal(false);

  private timerInterval: any;

  // Computed for Flip Clock
  minutes = computed(() => Math.floor(this.timeLeft() / 60).toString().padStart(2, '0'));
  seconds = computed(() => (this.timeLeft() % 60).toString().padStart(2, '0'));

  // Previous values for flip animation
  prevMinutes = signal('25');
  prevSeconds = signal('00');

  // Animation state
  minutesFlipping = signal(false);
  secondsFlipping = signal(false);

  constructor() {
    effect(() => {
      document.title = `${this.minutes()}:${this.seconds()} - Insomnia`;
    });

    // Track changes and trigger flip animation
    effect(() => {
      const currentMinutes = this.minutes();
      if (currentMinutes !== this.prevMinutes()) {
        this.minutesFlipping.set(true);
        // this.audioService.playFlipSound();
        setTimeout(() => {
          this.prevMinutes.set(currentMinutes);
          this.minutesFlipping.set(false);
        }, 500); // Match animation duration
      }
    });

    effect(() => {
      const currentSeconds = this.seconds();
      if (currentSeconds !== this.prevSeconds()) {
        this.secondsFlipping.set(true);
        // this.audioService.playFlipSound();
        setTimeout(() => {
          this.prevSeconds.set(currentSeconds);
          this.secondsFlipping.set(false);
        }, 500); // Match animation duration
      }
    });
  }

  toggleTimer() {
    if (this.isRunning()) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
      } else {
        this.completeTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning.set(false);
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft.set(this.modes[this.currentMode()].minutes * 60);
  }

  setMode(mode: TimerMode) {
    this.currentMode.set(mode);
    this.resetTimer();
  }

  completeTimer() {
    this.pauseTimer();
  }

  ngOnDestroy() {
    this.pauseTimer();
  }
}

