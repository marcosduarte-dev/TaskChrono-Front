import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListProjectsComponent, TemplateComponent],
  exports: [ListProjectsComponent, TemplateComponent],
})
export class ComponentsModule {}
