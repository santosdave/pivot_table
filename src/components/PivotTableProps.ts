import { Aggregator } from '../util/aggregation';
import { Dimension } from '../util/dimensions';
import { TitleNames } from './head';

/**
 * Configures the pivot table.
 *
 * @template T The type of record comprising the dataset being aggregated.
 */
export interface PivotTableProps<T, M extends keyof T> {
  /**
   * The aggregation operation to perform.
   */
  aggregator: Aggregator<T[M]>;

  /**
   * The properties of the data to display in the columns of the pivot table.
   *
   * Only a single column dimension is currently supported.
   */
  columnDimensions: [Dimension<T>];

  /**
   * The data to aggregate.
   */
  data: T[];

  /**
   * The property of the data to aggregate along {@link columns} and
   * {@link rows}.
   */
  metric: M;

  /**
   * The properties of the data to display in the rows of the pivot table.
   */
  rowDimensions: Array<Dimension<T>>;

  /**
   * The information to display in the title row of the pivot table.
   */
  title?: TitleNames;
}
