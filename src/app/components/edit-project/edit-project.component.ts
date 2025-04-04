import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  project: Project = {
    name: '',
    description: '',
    start_date: '',
    finish_date: ''
  };

  isNew = false;
  projectId: number | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('projectId');
    this.isNew = idParam === 'new';
    this.projectId = !this.isNew && idParam ? Number(idParam) : null;

    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (data) => {
          this.project = data;

          // Преобразуем строки с датами в формат YYYY-MM-DD
          if (this.project.start_date) {
            this.project.start_date = this.formatDate(this.project.start_date);
          }
          if (this.project.finish_date) {
            this.project.finish_date = this.formatDate(this.project.finish_date);
          }
        },
        error: (err) => console.error('Ошибка при загрузке проекта:', err)
      });
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Добавляем ведущий 0, если месяц < 10
    const day = d.getDate().toString().padStart(2, '0'); // Добавляем ведущий 0, если день < 10
    return `${year}-${month}-${day}`;
  }

  saveProject() {
    if (this.isNew) {
      console.log("creating new project");
      this.projectService.createProject(this.project).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Ошибка при создании проекта:', err);
          this.errorMessage = 'Ошибка при создании проекта. Пожалуйста, попробуйте позже.';
          alert(this.errorMessage); // Показываем алерт с ошибкой
        }
      });
    } else if (this.projectId !== null) {
      this.projectService.updateProject(this.projectId, this.project).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Ошибка при обновлении проекта:', err);
          this.errorMessage = 'Ошибка при обновлении проекта. Пожалуйста, попробуйте позже.';
          alert(this.errorMessage); // Показываем алерт с ошибкой
        }
      });
    }
  }
}
