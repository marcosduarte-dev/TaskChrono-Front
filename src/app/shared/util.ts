import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { TimerModel } from '../models/timer.model';
import { NodeModel } from '../models/node.model';
import { TreeNode } from 'primeng/api';

export function getTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  return brightness > 128 ? 'black' : 'white';
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Erro Code: ${error.status}, ` + `mensage: ${error.message}`;
  }
  return throwError(errorMessage);
}

export function getFormattedDateToTimerURL(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function createNodesToTimers(timers: TimerModel[]): TreeNode[] {
  var treeData = [] as NodeModel[];
  var treeNode = [] as TreeNode[];

  timers.forEach((timer) => {
    if (!treeData.some((data) => data.task.id === timer.task.id)) {
      let aux: NodeModel = {} as NodeModel;
      aux.task = timer.task;
      treeData.push(aux);
    }
  });

  treeData.forEach((node, i) => {
    let aux: TimerModel[] = [];
    timers.forEach((timer) => {
      if (timer.task.id === node.task.id) {
        aux.push(timer);
      }
    });

    treeData.at(i)!.childrens = aux;
  });

  treeNode = [];

  treeData.forEach((node, i) => {
    let children: {
      data: {
        id: string;
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
          id: child.id,
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
        id: i,
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

    treeNode.push(obj);
  });

  return treeNode;
}
