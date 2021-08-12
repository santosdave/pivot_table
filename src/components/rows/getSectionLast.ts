import { DimensionValue } from '../../util/dimensions';
import styles from '../../styles/Row.scss';

/**
 * Indicates whether the specified dimension values represent the final row in
 * their section of the pivot table.
 *
 * @param dimensionValues The dimension values whose finality will be
 * determined.
 * @param nextDimensionValues The dimension values for the next row in the
 * table, if any.
 * @param level The level of the values to compare to determine the finality of
 * the row.
 *
 * @returns A boolean indicating whether the specified dimension values
 * represent the final row in their section of the pivot table.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export function getSectionLast<T>(
  dimensionValues: Array<DimensionValue<T>>,
  nextDimensionValues: Array<DimensionValue<T>> | undefined,
  level: number
): string {
  if (
    nextDimensionValues === undefined ||
    nextDimensionValues[level - 1] === undefined ||
    nextDimensionValues[level - 1].value !== dimensionValues[level - 1].value
  ) {
    return styles.sectionLast;
  }

  return '';
}
