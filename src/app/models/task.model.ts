import { ProjectModel } from './project.model';

export interface TaskModel {
  id: string;
  name: string;
  description: string;
  color: string;
  project_id: string;
  project: ProjectModel;
}
