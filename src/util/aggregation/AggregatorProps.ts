import { DimensionValues } from '../dimensions';
import { PivotTableProps } from '../../components/PivotTableProps';

/**
 * Properties accepted by components that display or have a descendant that
 * displays aggregate data.
 *
 * @template T The type of record in the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export type AggregatorProps<T, M extends keyof T> =
  Pick<PivotTableProps<T, M>, 'aggregator' | 'data' | 'metric'> & {
    /**
     * The column dimensions and associated values appearing in the dataset.
     */
    columnDimensions: [DimensionValues<T>];

    /**
     * The row dimensions and associated values appearing in the dataset.
     */
    rowDimensions: Array<DimensionValues<T>>;
  };
