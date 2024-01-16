import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerSheetComponent } from './timer-sheet.component';

describe('TimerSheetComponent', () => {
  let component: TimerSheetComponent;
  let fixture: ComponentFixture<TimerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
