import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent {
  newTaskText = signal('');
  tasks = signal<Task[]>([]);

  // Focus state for input animation
  isFocused = signal(false);

  addTask() {
    const text = this.newTaskText().trim();
    if (!text) return;

    this.tasks.update(tasks => [
      ...tasks,
      { id: crypto.randomUUID(), text, completed: false }
    ]);
    this.newTaskText.set('');
  }

  toggleTask(id: string) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTask(id: string) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
