import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';


export const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects/:projectId', component: EditProjectComponent },
  { path: 'projects/new', component: EditProjectComponent}
];

