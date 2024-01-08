import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskService } from '../../shared/services/task.service';
import { ReturnModel } from '../../models/return.model';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  list: TaskModel[] = [];
  projects: ProjectModel[] = [];

  submitted: boolean = false;
  newTaskDialog: boolean = false;
  editTaskDialog: boolean = false;
  loaded: boolean = false;

  selectedTask!: TaskModel | null;
  selectedProject!: ProjectModel | null;
  task!: TaskModel;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  openEdit() {
    if (
      this.selectedTask!.name?.trim() &&
      this.selectedTask!.description?.trim() &&
      this.selectedTask!.color?.trim() &&
      this.selectedTask!.project_id?.trim()
    ) {
      this.editTaskDialog = true;
      this.submitted = false;
    }
  }

  openNew() {
    this.getProjects();
    this.task = {} as TaskModel;
    this.submitted = false;
    this.newTaskDialog = true;
  }

  hideDialog() {
    this.newTaskDialog = false;
    this.editTaskDialog = false;
    this.submitted = false;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((task: TaskModel[]) => {
      this.list = task;
      this.loaded = true;
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: ProjectModel[]) => {
      this.projects = projects;
      this.loaded = true;
    });
  }

  createTask() {
    this.task.project_id = this.selectedProject!.id;
    this.submitted = true;
    if (
      this.task!.name?.trim() &&
      this.task!.description?.trim() &&
      this.task!.color?.trim() &&
      this.task!.project_id?.trim()
    ) {
      this.taskService.createTask(this.task).subscribe(
        (ret: ReturnModel) => {
          if (ret.status === 'Success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task Created',
              life: 3000,
            });

            this.newTaskDialog = false;
            this.task = {} as TaskModel;
            this.getTasks();
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

  editTask(task: TaskModel): void {
    if (
      task!.name?.trim() &&
      task!.description?.trim() &&
      task!.color?.trim() &&
      task!.project_id?.trim()
    ) {
      this.taskService.editTask(task).subscribe(
        (ret: ReturnModel) => {
          if (ret.status === 'Success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task Edited',
              life: 3000,
            });
            this.selectedTask = null;
            this.editTaskDialog = false;
            this.getTasks();
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

  deleteSelectedTask() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected task?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(this.selectedTask!.id).subscribe(
          (ret: ReturnModel) => {
            if (ret.status === 'Success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Task Deleted',
                life: 3000,
              });
              this.selectedTask = null;
              this.getTasks();
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
    this.selectedTask = event.data;
    console.log(event.data);
  }

  onRowUnselect(event: any) {
    this.selectedTask = null;
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
