import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListProjectsComponent],
  exports: [ListProjectsComponent],
})
export class ComponentsModule {}
