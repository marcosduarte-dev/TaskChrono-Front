import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../shared/services/project.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.css',
  providers: [],
})
export class ListProjectsComponent implements OnInit {
  list: ProjectModel[] = [];

  submitted: boolean = false;

  selectedProject!: ProjectModel[] | null;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
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

  openNew() {}

  deleteSelectedProject() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Delete the project
        this.selectedProject = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
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
