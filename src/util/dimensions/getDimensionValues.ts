import { Dimension } from './Dimension';
import { DimensionValues } from './DimensionValues';

/**
 * Retrieves dimension-values for each value of the specified dimensions found
 * in the specified data.
 *
 * @param dimensions The dimensions whose values will be retrieved.
 * @param data The data from which to retrieve the values.
 *
 * @returns Dimension-values for each value of the specified dimensions found in
 * the specified data.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export function getDimensionValues<T>(
  dimensions: Array<Dimension<T>>,
  data: readonly T[]
): Array<DimensionValues<T>> {
  return dimensions.map(dimension => {
    const { property } = dimension;

    const allValues = data.map((record: T) => record[property]);

    const values = Array.from(new Set(allValues));

    return { dimension, values };
  });
}
