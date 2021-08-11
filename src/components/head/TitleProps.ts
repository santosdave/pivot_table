import { AggregatorProps } from '../../util/aggregation';
import { PivotTableProps } from '../PivotTableProps';

/**
 * The properties of the title row of the pivot table.
 */
export type TitleProps<T, M extends keyof T> =
  Pick<AggregatorProps<T, M>, 'columnDimensions' | 'rowDimensions'> &
  Pick<PivotTableProps<T, M>, 'title'>;
