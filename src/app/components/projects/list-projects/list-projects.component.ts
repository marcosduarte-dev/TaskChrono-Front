import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';
import { ReturnModel } from '../../../models/return.model';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../shared/services/project.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { getTextColor } from '../../../shared/util';

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
  newProjectDialog: boolean = false;
  editProjectDialog: boolean = false;
  loaded: boolean = false;

  selectedProject!: ProjectModel | null;
  project!: ProjectModel;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  openEdit() {
    if (
      this.selectedProject!.name?.trim() &&
      this.selectedProject!.description?.trim() &&
      this.selectedProject!.color?.trim()
    ) {
      this.editProjectDialog = true;
      this.submitted = false;
    }
  }

  openNew() {
    this.project = {} as ProjectModel;
    this.submitted = false;
    this.newProjectDialog = true;
  }

  hideDialog() {
    this.newProjectDialog = false;
    this.editProjectDialog = false;
    this.submitted = false;
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: ProjectModel[]) => {
      this.list = projects;
      this.loaded = true;
    });
  }

  createProject() {
    this.project.user_id = '1';
    this.submitted = true;
    if (
      this.project.name?.trim() &&
      this.project.description?.trim() &&
      this.project.color?.trim()
    ) {
      this.projectService.createProject(this.project).subscribe(
        (ret: ReturnModel) => {
          if (ret.status === 'Success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project Created',
              life: 3000,
            });

            this.newProjectDialog = false;
            this.project = {} as ProjectModel;
            this.getProjects();
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: error.message,
            life: 3000,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Blank fields',
        life: 3000,
      });
    }
  }

  editProject(project: ProjectModel): void {
    if (
      project.name?.trim() &&
      project.description?.trim() &&
      project.color?.trim()
    ) {
      this.projectService.editProject(project).subscribe(
        (ret: ReturnModel) => {
          if (ret.status === 'Success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project Edited',
              life: 3000,
            });
            this.selectedProject = null;
            this.editProjectDialog = false;
            this.getProjects();
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: error.message,
            life: 3000,
          });
        }
      );
    }
  }

  deleteSelectedProject() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected project?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProject(this.selectedProject!.id).subscribe(
          (ret: ReturnModel) => {
            if (ret.status === 'Success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Project Deleted',
                life: 3000,
              });
              this.selectedProject = null;
              this.getProjects();
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'danger',
              summary: 'Error',
              detail: error.message,
              life: 3000,
            });
          }
        );
      },
    });
  }

  onRowSelect(event: any) {
    this.selectedProject = event.data;
  }

  onRowUnselect(event: any) {
    this.selectedProject = null;
  }

  getTextColor(backgroundColor: string): string {
    return getTextColor(backgroundColor);
  }
}
