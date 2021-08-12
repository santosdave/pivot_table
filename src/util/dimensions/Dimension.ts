/**
 * A property of records in a dataset along which the records are aggregated in
 * a pivot table.
 *
 * @template T The type of the records being aggregated.
 */
export interface Dimension<T> {
  /**
   * The display name for the dimension.
   */
  name: string;

  /**
   * The property of {@link T} the dimension represents.
   */
  property: keyof T;
}
