import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor() {}

  private titleSubject = new BehaviorSubject<string>('');

  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  getTitle() {
    return this.titleSubject.asObservable();
  }
}
