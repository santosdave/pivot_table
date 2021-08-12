import { Dimension } from './Dimension';

/**
 * A value found in the dataset and its associated dimension in the pivot table.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export interface DimensionValue<T> {
  /**
   * The dimension to which the value belongs.
   */
  dimension: Dimension<T>;

  /**
   * The value of a property of {@link T}.
   */
  value: unknown;
}
