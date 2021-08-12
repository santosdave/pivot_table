import { aggregate, AggregatorProps } from '../../util/aggregation';
import { getDimensionValueCombinations } from '../../util/dimensions';
import { RowData } from './RowData';

/**
 * Retrieves the aggregated data to display in the rows of the pivot table
 * representing complete combinations of the table's row dimensions.
 *
 * @param param0 The aggregator properties determining how the data is
 * aggregated.
 *
 * @returns The aggregated data to display in the pivot table.
 *
 * @template T The type of record in the dataset to aggregate.
 * @template M The property of {@link T} to aggregate.
 */
export function getRows<T, M extends keyof T>({
  aggregator,
  columnDimensions,
  data,
  metric,
  rowDimensions
}: AggregatorProps<T, M>): Array<RowData<T>> {
  const defaultValue = String(aggregator.default);

  const [column] = columnDimensions;

  const columnProperty = column.dimension.property;

  const dimensionValueCombinations =
    getDimensionValueCombinations(rowDimensions);

  return dimensionValueCombinations
    .map(dimensionValues => ({
      data: column.values.map(columnValue => aggregate(
        data.filter(
          (record:any)=>
           dimensionValues.every(
              ({ dimension, value }) =>
                record[dimension.property] === value
            ) &&
            record[columnProperty] === columnValue
        ),
        metric,
        aggregator
      )),
      dimensionValues
    }))
    .filter(row => row.data.some(value => value !== defaultValue));
}
