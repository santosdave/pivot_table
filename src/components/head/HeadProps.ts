import { AggregatorProps } from '../../util/aggregation';
import { TitleProps } from './TitleProps';

/**
 * The properties of the head section of the pivot table.
 */
export type HeadProps<T> =
  Pick<AggregatorProps<T, keyof T>, 'columnDimensions' | 'rowDimensions'> &
  Pick<TitleProps<T, keyof T>, 'title'>;
