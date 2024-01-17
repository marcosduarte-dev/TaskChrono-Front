import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../shared/services/timer.service';
import { MessageService, TreeNode } from 'primeng/api';
import { TimerModel } from '../../models/timer.model';
import { TaskModel } from '../../models/task.model';
import { NodeModel } from '../../models/node.model';
import {
  createNodesToTimers,
  getFormattedDateToTimerURL,
  getTextColor,
} from '../../shared/util';
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

  treeNode!: TreeNode[];
  treeData: NodeModel[];

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
    this.date = getFormattedDateToTimerURL(new Date());
    this.loaded = false;
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

    let aux = {} as TimerModel;
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

    let aux = {} as TimerModel;

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
    let sec_num = value;
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getTimerByDate() {
    this.timerService.getByDate(this.date).subscribe((timers: TimerModel[]) => {
      this.treeNode = createNodesToTimers(timers);
      this.loaded = true;
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: ProjectModel[]) => {
      this.projects = projects;
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
