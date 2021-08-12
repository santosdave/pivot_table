import { DimensionValue } from '../../util/dimenssions';
import { RowLabelVisibility } from './RowLabelVisibility';

/**
 * Retrieves a label for each of the specified dimension values and whether it
 * should be visible in the pivot table, using the specified dimension values
 * from the previous row to determine the visibility.
 *
 * @param dimensionValues The dimension values for which to retrieve labels.
 * @param previousDimensionValues The previous row's dimension values, if any.
 *
 * @returns The label and visibility for each of the specified dimension values.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export function getRowLabelVisibility<T>(
  dimensionValues: Array<DimensionValue<T>>,
  previousDimensionValues?: Array<DimensionValue<T>>
): RowLabelVisibility[] {
  return dimensionValues.map(({ value }, i) => {
    const label = String(value);

    const visible =
      previousDimensionValues === undefined ||
      previousDimensionValues[i].value !== value;

    return { label, visible };
  });
}
