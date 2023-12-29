import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css',
  providers: [],
})
export class ListProjectsComponent implements OnInit {
  Projects: ProjectModel[] = [];

  list: ProjectModel[] = [];

  cnu: ProjectModel = {} as ProjectModel;
  pme: ProjectModel = {} as ProjectModel;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.cnu.id = 'ID';
    this.cnu.name = 'CNU';
    this.cnu.description = 'Project CNU';
    this.cnu.color = '#FFFFFF';
    this.cnu.user_id = '1';

    this.pme.id = 'ID';
    this.pme.name = 'PME';
    this.pme.description = 'Project PME';
    this.pme.color = '#000000';
    this.pme.user_id = '1';

    this.Projects.push(this.cnu);
    this.Projects.push(this.pme);

    this.getProjects();
    console.log(this.list);
  }

  editProject(project: ProjectModel): void {
    console.log(project);
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: ProjectModel[]) => {
      this.list = projects;
    });
  }

  getTextColor(backgroundColor: string): string {
    const rgb = this.hexToRgb(backgroundColor);

    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    return brightness > 128 ? 'black' : 'white';
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }
}
