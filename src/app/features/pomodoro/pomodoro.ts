import { Component } from "@angular/core";
import { TimerComponent } from "./components/timer/timer";
import { TaskListComponent } from "./components/task-list/task-list";
import { SoundMixerComponent } from "./components/sound-mixer/sound-mixer";
import { MusicPlayerComponent } from "./components/music-player/music-player";
import { AudioControlsComponent } from "./components/audio-controls/audio-controls";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [TimerComponent, TaskListComponent, SoundMixerComponent, MusicPlayerComponent, AudioControlsComponent],
  templateUrl: './pomodoro.html',
  styleUrls: ['./pomodoro.scss'],
})
export class PomodoroComponent {

}