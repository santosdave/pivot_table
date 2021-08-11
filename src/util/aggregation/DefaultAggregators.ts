import { Aggregator } from './Aggregator';

/**
 * The default aggregators provided for use in the pivot table.
 */
export interface DefaultAggregators {
  /**
   * Sums numeric metrics.
   */
  sum: Aggregator<number>;
}
