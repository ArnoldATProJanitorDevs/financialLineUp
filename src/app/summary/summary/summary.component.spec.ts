import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SummaryComponent} from './summary.component';
import {SharedModule} from "../../shared/shared.module";

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculateTotal - should calculate total of all numbers', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }
    const sum = component.calculateTotal(numbers);
    expect(sum).toBe(45);
  });

  it('calculatePercentage - should calculate total of all numbers after taxes', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    let taxrateInteger = 50;

    for (let i = 0; i < numbers.length; i++) {
      const sum = component.calculatePercentage(numbers[i], taxrateInteger);
      expect(sum).toBeCloseTo(numbers[i] * 2, 1);
    }

  });

});
