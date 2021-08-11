import { AggregatorProps } from '../../util/aggregation';
import { RowData } from '../rows';

/**
 * The properties of a top-level section of the pivot table.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export interface SectionProps<T, M extends keyof T>
  extends AggregatorProps<T, M> {
  /**
   * The aggregated data to display in the section.
   */
  rowData: Array<RowData<T>>;

  /**
   * The value of the top-level row dimension being aggregated in the section.
   */
  value: unknown;
}
