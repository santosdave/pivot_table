import { AggregatorProps } from '../../util/aggregation';
import { DimensionValue } from '../../util/dimensions';
import { SubsectionProps } from '../sections';

/**
 * The properties of a data row in the pivot table.
 *
 * @template T The type of record comprising the aggregated dataset.
 */
export type RowProps<T> =
  Pick<AggregatorProps<T, keyof T>, 'columnDimensions'> &
  Pick<SubsectionProps<T, keyof T>, 'dimensionValues' | 'onCollapse'> & {
    /**
     * The dimension values that will be displayed in the next row, if any.
     */
    nextDimensionValues?: Array<DimensionValue<T>>;

    /**
     * The dimension values displayed in the previous row, if any.
     */
    previousDimensionValues?: Array<DimensionValue<T>>;

    /**
     * The aggregate value strings to display in the row.
     */
    values: readonly string[];
  };
