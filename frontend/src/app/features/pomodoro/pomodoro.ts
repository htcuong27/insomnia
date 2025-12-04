import { Component, model } from "@angular/core";
import { AudioControlsComponent } from "./components/audio-controls/audio-controls";
import { MusicPlayerComponent } from "./components/music-player/music-player";
import { SoundMixerComponent } from "./components/sound-mixer/sound-mixer";
import { TaskListComponent } from "./components/task-list/task-list";
import { TimerComponent } from "./components/timer/timer";
import { BackgroundSelectorComponent } from "./components/background-selector/background-selector";
import { ClickOutsideDirective } from "../../shared/directives/click-outside.directive";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, TaskListComponent, SoundMixerComponent, MusicPlayerComponent, AudioControlsComponent, BackgroundSelectorComponent, ClickOutsideDirective],
  templateUrl: './pomodoro.html',
  styleUrls: ['./pomodoro.scss'],
})
export class PomodoroComponent {
  opened = model<'soundMixer' | 'musicPlayer' | 'backgroundSelector' | null>(null);

  closeIfOpen(id: string) {
    if (this.opened() === id) {
      this.opened.set(null);
    }
  }
}