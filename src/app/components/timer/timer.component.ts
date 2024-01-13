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
import { DateTransformPipe } from '../../shared/pipes/date-transform.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  subscription!: Subscription;
  counter: number;
  isPaused: boolean;
  display: string;

  date: string;
  loaded: boolean;

  list!: TreeNode[];
  nodeAux!: TreeNode;

  taskList: TaskModel[];
  timersArray: [[]];
  treeData: NodeModel[];
  treeNode!: TreeNode[];

  constructor(
    private timerService: TimerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.counter = 0;
    this.isPaused = false;
    this.display = '00:00:00';
    this.date = '2022-01-01';
    this.loaded = false;
    this.taskList = [];
    this.treeData = [];
    this.timersArray = [[]];
  }

  ngOnInit(): void {
    this.getTimerByDate();
  }

  getTimerByDate() {
    this.timerService.getByDate(this.date).subscribe((timers: TimerModel[]) => {
      this.createNodesToTimers(timers);
      this.loaded = true;
    });
  }

  startTimer() {
    const source = timer(1000, 1000);
    this.subscription = source.subscribe((val) => {
      if (!this.isPaused) {
        this.counter = val;
        console.log(val);
        this.display = this.transform(this.counter);
      }
    });
  }

  stopTimer() {
    console.log(this.counter);
    this.subscription.unsubscribe();
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
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

    console.log(this.treeNode);
  }
}
