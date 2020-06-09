import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestylesComponent } from './lifestyles.component';

describe('LifestylesComponent', () => {
  let component: LifestylesComponent;
  let fixture: ComponentFixture<LifestylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifestylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
