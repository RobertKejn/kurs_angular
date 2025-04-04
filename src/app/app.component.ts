import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProjectListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kurs_app';
}
