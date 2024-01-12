import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  subscription!: Subscription;
  counter: number;
  isPaused: boolean;
  display: string;

  constructor() {
    this.counter = 0;
    this.isPaused = false;
    this.display = '00:00:00';
  }

  ngOnInit(): void {}

  startTimer() {
    const source = timer(1000, 1000);
    this.subscription = source.subscribe((val) => {
      if (!this.isPaused) {
        this.counter = val;
        console.log(val);
        this.display = this.transform(this.counter);
      }
    });
  }

  stopTimer() {
    console.log(this.counter);
    this.subscription.unsubscribe();
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
