import { DimensionValue } from '../../util/dimenssions';

/**
 * Aggregated data to display in a row of the pivot table.
 *
 * Represents a complete combinations of the table's row dimensions.
 *
 * @template T The type of record comprising the aggregated dataset.
 */
export interface RowData<T> {
  /**
   * The string values to display in the row.
   */
  data: readonly string[];

  /**
   * The row dimension values represented by the row.
   */
  dimensionValues: Array<DimensionValue<T>>;
}
