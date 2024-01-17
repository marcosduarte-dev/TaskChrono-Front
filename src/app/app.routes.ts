import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './components/projects/list-projects/list-projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimerSheetComponent } from './components/timer-sheet/timer-sheet.component';

export const routes: Routes = [
  { path: 'projects', component: ListProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'timersheet', component: TimerSheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
