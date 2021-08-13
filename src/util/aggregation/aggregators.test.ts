import { aggregators } from './aggregators';

describe('sum', () => {
  test('sums the specified numbers', () => {
    const number7 = Math.random();
    const number9 = Math.random();

    const sum = aggregators.sum
      .aggregate(number7, number9, Math.random(), [Math.random()]);

    expect(sum).toBe(number7 + number9);
  });
});
