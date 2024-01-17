import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { TemplateComponent } from './template/template.component';
import { TimerSheetComponent } from './timer-sheet/timer-sheet.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListProjectsComponent,
    TemplateComponent,
    TimerSheetComponent,
  ],
  exports: [ListProjectsComponent, TemplateComponent, TimerSheetComponent],
})
export class ComponentsModule {}
