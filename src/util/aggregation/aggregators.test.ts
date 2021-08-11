import { aggregators } from './aggregators';

describe('sum', () => {
  test('sums the specified numbers', () => {
    const number1 = Math.random();
    const number2 = Math.random();

    const sum = aggregators.sum
      .aggregate(number1, number2, Math.random(), [Math.random()]);

    expect(sum).toBe(number1 + number2);
  });
});
