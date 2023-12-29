import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    SidebarModule,
    ButtonModule,
    TableModule,
    TagModule,
    HttpClientModule,
  ],
  declarations: [],
  exports: [SidebarModule, ButtonModule, TableModule, TagModule],
  providers: [ProjectService],
})
export class SharedModule {}
