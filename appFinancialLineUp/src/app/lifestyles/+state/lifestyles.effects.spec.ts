import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LifestylesEffects } from './lifestyles.effects';

describe('LifestylesEffects', () => {
  let actions$: Observable<any>;
  let effects: LifestylesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LifestylesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LifestylesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
