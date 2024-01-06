import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  sidebarVisible: boolean = true;
  sidebarModal: boolean = false;

  constructor(private router: Router) {}

  navigate(destination: string) {
    switch (destination) {
      case 'projects':
        this.router.navigate(['/projects']);
        break;
      case 'tasks':
        this.router.navigate(['/tasks']);
        break;
      case 'home':
        this.router.navigate(['/home']);
        break;

      default:
        break;
    }
  }
}
