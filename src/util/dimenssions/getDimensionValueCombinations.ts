import { DimensionValue } from './DimensionValue';
import { DimensionValues } from './DimensionValues';

/**
 * Retrieves every combination of dimension-value from the specified
 * dimension-values, maintaing the original specified order.
 *
 * @param param0 The dimension-values whose combinations will be retrieved.
 *
 * @returns Every combination of dimension-value from the specified
 * dimension-values.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export function getDimensionValueCombinations<T>(
  [{ dimension, values }, ...remaining]: Array<DimensionValues<T>>
): Array<Array<DimensionValue<T>>> {
  if (remaining.length > 0) {
    const combos = getDimensionValueCombinations(remaining);

    return values
      .flatMap(value => combos.map(combo => [{ dimension, value }, ...combo]));
  }

  return values.map(value => [{ dimension, value }]);
}
