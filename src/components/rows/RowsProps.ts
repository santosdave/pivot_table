import { AggregatorProps } from '../../util/aggregation';
import { SectionProps, SubsectionProps } from '../sections';

/**
 * The properties of the pivot table rows.
 *
 * @template T The type of record comprising the dataset being aggregated.
 */
export type RowsProps<T> =
  Pick<AggregatorProps<T, keyof T>, 'columnDimensions'> &
  Pick<SectionProps<T, keyof T>, 'rowData'> &
  Pick<SubsectionProps<T, keyof T>, 'onCollapse' | 'subsectionData'>;
