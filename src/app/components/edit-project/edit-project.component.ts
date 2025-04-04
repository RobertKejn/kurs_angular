import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
  projectId!: number;
  project = {
    name: '',
    description: '',
    start_date: '',
    finish_date: '',
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    this.http.get<any>(`http://localhost:8080/projects/${this.projectId}`).subscribe(data => {
      this.project = {
        name: data.name,
        description: data.description,
        start_date: data.start_date.slice(0, 10),
        finish_date: data.finish_date.slice(0, 10),
      };
    });
  }

  saveProject() {
    this.http.put(`http://localhost:8080/projects/${this.projectId}`, this.project)
      .subscribe(() => {
        alert('Проект обновлен!');
      });
  }
}
