import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';  // Импорт модели задачи
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [NgFor, NgIf, CommonModule]
})
export class TaskListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  projectId!: number;
  tasks: Task[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    // Получаем ID проекта из параметров маршрута
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    // Загружаем задачи для этого проекта
    this.taskService.getTasksByProjectId(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке задач';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
