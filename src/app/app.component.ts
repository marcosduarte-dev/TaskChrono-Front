import { Component } from '@angular/core';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TaskChrono';

  sidebarVisible: boolean = true;
  sidebarModal: boolean = false;
}
