import { AggregatorProps } from '../../util/aggregation';

/**
 * The properties of the pivot table heading row.
 */
export type HeadingProps<T> =
  Pick<AggregatorProps<T, keyof T>, 'columnDimensions' | 'rowDimensions'>;
