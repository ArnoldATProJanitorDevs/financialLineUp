import * as fromLifestyles from './lifestyles.actions';

describe('loadLifestyless', () => {
  it('should return an action', () => {
    expect(fromLifestyles.loadLifestyles().type).toBe('[Lifestyles] Load Lifestyless');
  });
});
