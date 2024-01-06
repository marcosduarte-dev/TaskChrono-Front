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

import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
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
  ],
  declarations: [],
  exports: [
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
  ],
  providers: [ProjectService, MessageService, ConfirmationService],
})
export class SharedModule {}
