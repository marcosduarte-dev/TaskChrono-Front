import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProjectService } from './services/project.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';

import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import {
  DateTransformPipe,
  DurationTransformPipe,
} from './pipes/date-transform.pipe';

@NgModule({
  imports: [
    DateTransformPipe,
    DurationTransformPipe,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    DropdownModule,
    TreeTableModule,
  ],
  declarations: [],
  exports: [
    DateTransformPipe,
    DurationTransformPipe,
    FormsModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    DropdownModule,
    TreeTableModule,
  ],
  providers: [ProjectService, TaskService, MessageService, ConfirmationService],
})
export class SharedModule {}
