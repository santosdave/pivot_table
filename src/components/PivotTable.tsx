import React from 'react';
import Body from './Body';
import { getDimensionValues } from '../util/dimensions';
import { Head } from './head';
import styles from '../styles/PivotTable.scss';
import { PivotTableProps } from './PivotTableProps';
import { TotalRow } from './rows';

/**
 * A pivot table for a specified dataset.
 *
 * @param props The pivot table properties.
 *
 * @returns The rendered pivot table.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export default function PivotTable<T, M extends keyof T>(
  props: PivotTableProps<T, M>
): JSX.Element {
  const {
    aggregator,
    columnDimensions,
    data,
    metric,
    rowDimensions,
    title
  } = props;

  const [columnDimension] = getDimensionValues(columnDimensions, data);

  const rowDimensionValues = getDimensionValues(rowDimensions, data);

  return (
    <table className={styles.pivotTable}>
      <Head
        columnDimensions={[columnDimension]}
        rowDimensions={rowDimensionValues}
        title={title}
      />

      <Body
        aggregator={aggregator}
        columnDimensions={[columnDimension]}
        data={data}
        metric={metric}
        rowDimensions={rowDimensionValues}
      />

      <tfoot>
        <TotalRow
          aggregator={aggregator}
          columnDimensions={[columnDimension]}
          data={data}
          metric={metric}
          rowDimensions={rowDimensionValues}
        />
      </tfoot>
    </table>
  );
}
