import { Dimension } from './Dimension';

/**
 * A dimension in the pivot table and its values found within the dataset.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export interface DimensionValues<T> {
  /**
   * The dimension to which the values belong.
   */
  dimension: Dimension<T>;

  /**
   * The values of the properties of {@link T} found within the dataset for the
   * dimension.
   */
  values: unknown[];
}
