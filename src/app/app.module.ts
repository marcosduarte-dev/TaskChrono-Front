import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './shared/services/project.service';
import { TaskService } from './shared/services/task.service';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  bootstrap: [],
  providers: [ProjectService, TaskService],
})
export class AppModule {}
