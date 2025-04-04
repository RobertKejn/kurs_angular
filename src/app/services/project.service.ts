import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/projects/all';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
  createProject(project: Partial<Project>) {
    return this.http.post(`${this.apiUrl}/projects`, project);
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }
  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, project);
  }
  
}
