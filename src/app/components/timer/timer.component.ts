import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../shared/services/timer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TimerModel } from '../../models/timer.model';
import { TreeNode } from 'primeng/api';
import { TaskModel } from '../../models/task.model';
import { NodeModel } from '../../models/node.model';
import { getTextColor } from '../../shared/util';
import { TimerRecordType } from '../../shared/enums/timer-record-type';
import { ProjectModel } from '../../models/project.model';
import { ProjectService } from '../../shared/services/project.service';
import { TaskService } from '../../shared/services/task.service';
import { ReturnModel } from '../../models/return.model';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  subscription!: Subscription;

  date: string;
  display: string;

  counter: number;

  loaded: boolean;
  canStop: boolean;
  canStart: boolean;
  canSelectProject: boolean;
  canSelectTask: boolean;

  list!: TreeNode[];
  nodeAux!: TreeNode;
  treeNode!: TreeNode[];
  treeData: NodeModel[];

  taskList: TaskModel[];

  projects: ProjectModel[] = [];
  selectedProject!: ProjectModel | null;

  tasks: TaskModel[] = [];
  selectedTask!: TaskModel | null;

  timer!: TimerModel | null;

  constructor(
    private timerService: TimerService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private messageService: MessageService
  ) {
    this.counter = 0;
    this.display = '00:00:00';
    this.date = this.getFormattedDate(new Date());
    this.loaded = false;
    this.taskList = [];
    this.treeData = [];
    this.canStart = false;
    this.canStop = false;
    this.canSelectProject = true;
    this.canSelectTask = false;
  }

  ngOnInit(): void {
    this.getTimerByDate();
    this.getProjects();
  }

  startTimer() {
    const source = timer(1000, 1000);
    this.subscription = source.subscribe((val) => {
      this.counter = val;
      this.display = this.transform(this.counter);
    });
    this.canStart = false;
    this.canStop = true;
    this.canSelectProject = false;
    this.canSelectTask = false;

    const now = new Date();

    var aux = {} as TimerModel;
    aux.start_time = now;
    aux.record_type = TimerRecordType.Start;
    aux.total_duration = 0;
    aux.task_id = this.selectedTask?.id!;

    this.createTimer(aux);
  }

  stopTimer() {
    console.log(this.counter);
    this.subscription.unsubscribe();
    this.canStart = true;
    this.canStop = false;
    this.canSelectProject = true;
    this.canSelectTask = true;

    const now = new Date();

    var aux = {} as TimerModel;

    aux.end_time = now;
    aux.record_type = TimerRecordType.Stop;
    aux.total_duration = this.counter;
    aux.task_id = this.selectedTask?.id!;

    this.createTimer(aux);
  }

  onChangeProject() {
    if (this.selectedProject == null) {
      this.canSelectTask = false;
      this.tasks = [];
    } else {
      this.getTasks();
      this.canSelectTask = true;
    }
    console.log(this.selectedProject);
  }

  onChangeTask() {
    this.canStart = this.selectedTask != null;
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  }

  createNodesToTimers(timers: TimerModel[]) {
    timers.forEach((timer) => {
      if (!this.treeData.some((data) => data.task.id === timer.task.id)) {
        let aux: NodeModel = {} as NodeModel;
        aux.task = timer.task;
        this.treeData.push(aux);
      }
    });

    this.treeData.forEach((node, i) => {
      let aux: TimerModel[] = [];
      timers.forEach((timer) => {
        if (timer.task.id === node.task.id) {
          aux.push(timer);
        }
      });

      this.treeData.at(i)!.childrens = aux;
    });

    this.treeNode = [];

    this.treeData.forEach((node) => {
      let children: {
        data: {
          taskName: string;
          taskColor: string;
          taskDescription: string;
          projectName: string;
          projectColor: string;
          totalDuration: number;
          startTime: Date;
          endTime: Date;
        };
      }[] = [];
      let totalDuration = 0;

      node.childrens.forEach((child) => {
        let childObj = {
          data: {
            taskName: child.task.name,
            taskColor: child.task.color,
            taskDescription: child.task.description,
            projectName: child.task.project.name,
            projectColor: child.task.project.color,
            totalDuration: child.total_duration,
            startTime: child.start_time,
            endTime: child.end_time,
            record_type: child.record_type,
          },
        };
        totalDuration += child.total_duration;
        children.push(childObj);
      });
      let obj = {
        data: {
          taskName: node.task.name,
          taskColor: node.task.color,
          taskDescription: node.task.description,
          projectName: node.task.project.name,
          projectColor: node.task.project.color,
          totalDuration: totalDuration,
          startTime: '',
          endTime: '',
          record_type: '',
        },
        children: children,
      };

      this.treeNode.push(obj);
    });
  }

  getTimerByDate() {
    this.timerService.getByDate(this.date).subscribe((timers: TimerModel[]) => {
      this.createNodesToTimers(timers);
      this.loaded = true;
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: ProjectModel[]) => {
      this.projects = projects;
      this.loaded = true;
    });
  }

  getTasks() {
    this.taskService
      .getTasksByProjectID(this.selectedProject?.id!)
      .subscribe((tasks: TaskModel[]) => {
        this.tasks = tasks;
      });
  }

  createTimer(timer: TimerModel) {
    this.timerService.createTimer(timer).subscribe(
      (ret: ReturnModel) => {},
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

  getTextColor(backgroundColor: string): string {
    return getTextColor(backgroundColor);
  }
}
