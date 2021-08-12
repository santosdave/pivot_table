import React from 'react';
import { AggregatorProps } from '../util/aggregation';
import styles from '../styles/Body.module.scss';
import { getRows } from './rows';
import { Section } from './sections';

/**
 * The body of the pivot table.
 *
 * @param props The properties of the pivot table body.
 *
 * @returns The rendered pivot table body.
 *
 * @template T The type of record in the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export default function Body<T, M extends keyof T>(
  props: AggregatorProps<T, M>
): JSX.Element {
  const {
    aggregator,
    columnDimensions,
    data,
    metric,
    rowDimensions
  } = props;

  const [firstDimension, ...remainingRows] = rowDimensions;

  const rowData = getRows(props);

  const sections = firstDimension.values.map(value => {
    const { dimension } = firstDimension;

    const exclusiveFirstRow = { dimension, values: [value] };

    return (
      <Section
        aggregator={aggregator}
        columnDimensions={columnDimensions}
        data={data}
        key={String(value)}
        metric={metric}
        rowData={rowData}
        rowDimensions={[exclusiveFirstRow, ...remainingRows]}
        value={value}
      />
    );
  });

  return <tbody className={styles.body}>{sections}</tbody>;
}
