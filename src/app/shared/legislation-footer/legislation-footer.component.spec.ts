import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislationFooterComponent } from './legislation-footer.component';

describe('LegislationFooterComponent', () => {
  let component: LegislationFooterComponent;
  let fixture: ComponentFixture<LegislationFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislationFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
