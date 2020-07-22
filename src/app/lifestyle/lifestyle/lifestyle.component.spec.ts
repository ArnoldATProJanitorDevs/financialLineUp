import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestyleComponent} from './lifestyle.component';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {TaxratesModule} from "../../taxrates/taxrates.module";
import {SummaryModule} from "../../summary/summary.module";
import {ItemsModule} from "../../items/items.module";

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        TaxratesModule,
        SummaryModule,
        ItemsModule
      ]
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

});
