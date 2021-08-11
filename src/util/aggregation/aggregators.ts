import { DefaultAggregators } from './DefaultAggregators';

/**
 * The default aggregators provided for use in the pivot table.
 */
export const aggregators: DefaultAggregators = {
  sum: {
    aggregate: (previousValue: number, currentValue: number): number =>
      previousValue + currentValue,
    default: 0
  }
};
