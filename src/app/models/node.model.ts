import { TaskModel } from './task.model';
import { TimerModel } from './timer.model';

export interface NodeModel {
  task: TaskModel;
  childrens: TimerModel[];
}
