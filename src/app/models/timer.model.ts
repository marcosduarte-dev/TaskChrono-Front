import { TaskModel } from './task.model';

export interface TimerModel {
  id: string;
  start_time: Date;
  end_time: Date;
  total_duration: number;
  record_type: string;
  task_id: string;
  task: TaskModel;
}
