/**
 * Aggregates data for display in the pivot table.
 *
 * @template T The type of value to aggregate.
 */
export interface Aggregator<T> {
  /**
   * The reduction function called for each value in the dataset.
   */
  aggregate: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => T;

  /**
   * The default aggregate value when the dataset is empty.
   */
  default: T;
}
