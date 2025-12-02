import { Component, model } from "@angular/core";
import { AudioControlsComponent } from "./components/audio-controls/audio-controls";
import { MusicPlayerComponent } from "./components/music-player/music-player";
import { SoundMixerComponent } from "./components/sound-mixer/sound-mixer";
import { TaskListComponent } from "./components/task-list/task-list";
import { TimerComponent } from "./components/timer/timer";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, TaskListComponent, SoundMixerComponent, MusicPlayerComponent, AudioControlsComponent],
  templateUrl: './pomodoro.html',
  styleUrls: ['./pomodoro.scss'],
})
export class PomodoroComponent {
  opened = model<'soundMixer' | 'musicPlayer' | null>(null);

  toggleSoundMixer(): void {
    this.opened.update(v => v === 'soundMixer' ? null : 'soundMixer');
  }

  toggleMusicPlayer(): void {
    this.opened.update(v => v === 'musicPlayer' ? null : 'musicPlayer');
  }
}