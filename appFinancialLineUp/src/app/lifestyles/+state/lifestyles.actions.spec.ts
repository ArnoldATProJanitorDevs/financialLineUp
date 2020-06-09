import * as fromLifestyles from './lifestyles.actions';

describe('loadLifestyles', () => {
  it('should return an action', () => {
    expect(fromLifestyles.loadLifestyles().type).toBe('[Lifestyles] Load Lifestyles');
  });
});
