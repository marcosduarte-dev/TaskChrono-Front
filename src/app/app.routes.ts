import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './components/projects/list-projects/list-projects.component';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
  { path: 'projects', component: ListProjectsComponent },
  { path: 'tasks', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
