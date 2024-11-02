import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingHabitsChartComponent } from './feeding-habits-chart.component';

describe('FeedingHabitsChartComponent', () => {
  let component: FeedingHabitsChartComponent;
  let fixture: ComponentFixture<FeedingHabitsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedingHabitsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedingHabitsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
