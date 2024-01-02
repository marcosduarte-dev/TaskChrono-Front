import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProjectService } from './services/project.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  imports: [
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  declarations: [],
  exports: [
    SidebarModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  providers: [ProjectService, MessageService, ConfirmationService],
})
export class SharedModule {}
