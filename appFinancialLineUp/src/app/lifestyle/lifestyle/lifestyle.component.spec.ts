import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestyleComponent} from './lifestyle.component';
import {Item} from "../../item/models/item.interface";

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a LifeStyle', () => {
    component = fixture.componentInstance;
    const Lifestyle = component.Lifestyle;
    expect(Lifestyle).toBeTruthy();
  });

  it('should have a every property GT than 0, taxes GTE 0', () => {
    component = fixture.componentInstance;
    const Lifestyle = component.Lifestyle;
    expect(Lifestyle.Items.length).toBeGreaterThan(0);
    expect(Lifestyle.Description.length).toBeGreaterThan(0);
    expect(Lifestyle.Id).toBeTruthy();
    expect(Lifestyle.Name.length).toBeGreaterThan(0);
    expect(Lifestyle.TaxRates.length).toBeGreaterThanOrEqual(0);
  });

  it('should calculate total of all numbers', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }
    const sum = component.calculateTotal(numbers);
    expect(sum).toBe(45);
  });

  it('should calculate total of all numbers after taxes', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    let taxrateInteger = 40;
    const results = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600];


    for (let i = 1; i <= 10; i++) {
      numbers.push(i * 100);
    }


    for (let i = 0; i < 10; i++) {
      const sum = component.calculateAfterTaxes(numbers[i], taxrateInteger);
      expect(sum).toBe(results[i]);

    }

  });


});
