import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ComponentsModule, BrowserModule, BrowserAnimationsModule],
  declarations: [],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
