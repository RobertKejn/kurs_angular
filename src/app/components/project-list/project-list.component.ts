import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- Добавили Router

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  imports: [NgFor, NgIf, DatePipe, CommonModule, RouterModule],
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router); // <-- Добавили

  projects: Project[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Ответ сервера:', data);
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка при загрузке проектов:', err);
        this.error = 'Ошибка загрузки проектов';
        this.loading = false;
      },
    });
  }

  // ✅ Вот этот метод обязательно должен быть внутри класса
  shouldShowList(): boolean {
    return this.router.url === '/projects';
  }
}
