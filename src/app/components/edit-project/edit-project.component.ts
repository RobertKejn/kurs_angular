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

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('projectId');
    this.isNew = idParam === 'new';
    this.projectId = !this.isNew && idParam ? Number(idParam) : null;

    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (data) => this.project = data,
        error: (err) => console.error('Ошибка при загрузке проекта:', err)
      });
    }
  }

  saveProject() {
    if (this.isNew) {
      console.log("creating new project");
      this.projectService.createProject(this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    } else if (this.projectId !== null) {
      this.projectService.updateProject(this.projectId, this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
