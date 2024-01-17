import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TitleService } from '../../shared/services/title.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  sidebarVisible: boolean = true;
  sidebarModal: boolean = false;
  title: string;

  constructor(
    private router: Router,
    public titleService: TitleService,
    private Location: Location
  ) {
    this.title = 'Timer';
  }
  ngOnInit(): void {
    this.updateTitle(this.Location.path());
  }

  navigate(destination: string) {
    switch (destination) {
      case 'projects':
        this.router.navigate(['/projects']);
        this.updateTitle('/projects');
        break;
      case 'tasks':
        this.router.navigate(['/tasks']);
        this.updateTitle('/tasks');
        break;
      case 'timer':
        this.router.navigate(['/timer']);
        this.updateTitle('/timer');
        break;
      case 'timersheet':
        this.router.navigate(['/timersheet']);
        this.updateTitle('/timersheet');
        break;
      default:
        break;
    }
  }

  updateTitle(url: string) {
    switch (url) {
      case '/projects':
        this.titleService.setTitle('Projects');
        break;
      case '/tasks':
        this.titleService.setTitle('Tasks');
        break;
      case '/timersheet':
        this.titleService.setTitle('Timer Sheet');
        break;
      case '/timer':
      case '':
        this.titleService.setTitle('Timer');
        break;
    }
  }
}
