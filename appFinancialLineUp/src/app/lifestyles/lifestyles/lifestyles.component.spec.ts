import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestylesComponent} from './lifestyles.component';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {StoreModule} from "@ngrx/store";
import * as fromLifestyles from "../+state/lifestyles.reducer";
import {Actions, EffectsModule} from "@ngrx/effects";
import {LifestylesEffects} from "../+state/lifestyles.effects";

describe('LifestylesComponent', () => {
  let component: LifestylesComponent;
  let fixture: ComponentFixture<LifestylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromLifestyles.LIFESTYLE_FEATURE_KEY, fromLifestyles.reducer, {metaReducers: fromLifestyles.metaReducers}),
        EffectsModule.forRoot(),
        EffectsModule.forFeature([LifestylesEffects])
      ],
      declarations: [LifestylesComponent],
      providers: [LifestylesFacade, Actions]
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
