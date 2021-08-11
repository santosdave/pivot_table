import { Aggregator } from './Aggregator';
import { finishAggregate } from './finishAggregate';

/**
 * Aggregates the specified data by the specified metric using the specified
 * aggregator.
 *
 * @param data The data to aggregate.
 * @param metric The property of the data to aggregate.
 * @param aggregator The aggregator determining the aggregate output.
 *
 * @returns The aggregate value to display in the pivot table.
 *
 * @template T The type of record in the dataset to aggregate.
 * @template M The property of {@link T} to aggregate.
 */
export function aggregate<T, M extends keyof T>(
  data: T[],
  metric: M,
  aggregator: Aggregator<T[M]>
): string {
  const value = data.length > 0
    ? data
      .map(record => record[metric])
      .reduce(aggregator.aggregate)
    : aggregator.default;

  return finishAggregate(value);
}
