import React from 'react';
import { getRowColumnCells } from './getRowColumnCells';
import { getRowLabelCells } from './getRowLabelCells';
import { getRowLabelVisibility } from './getRowLabelVisibility';
import { getSectionLast } from './getSectionLast';
import styles from '../../styles/Row.scss';
import { RowProps } from './RowProps';

const { row } = styles;

/**
 * A data row in the pivot table.
 *
 * Displays the aggregate data for a single complete combination of the table's
 * row and column dimensions.
 *
 * @param props The row properties.
 *
 * @returns The rendered row.
 *
 * @template T The type of record comprising the dataset being aggregated.
 */
export default function Row<T>(props: RowProps<T>): JSX.Element {
  const {
    columnDimensions,
    dimensionValues,
    nextDimensionValues,
    onCollapse,
    previousDimensionValues,
    values
  } = props;

  const level = dimensionValues.length - 1;

  const label = String(dimensionValues[level].value);

  const labelVisibility =
    getRowLabelVisibility(dimensionValues, previousDimensionValues);

  const labels = getRowLabelCells(labelVisibility, onCollapse);

  const allLabelsVisible = labelVisibility.every(({ visible }) => visible);

  const sectionFirst = allLabelsVisible ? styles.sectionFirst : '';

  const sectionLast =
    getSectionLast(dimensionValues, nextDimensionValues, level);

  const columnCells = getRowColumnCells(values, columnDimensions);

  return (
    <tr className={`${row} ${sectionFirst} ${sectionLast}`} key={label}>
      {labels}

      <td />

      {columnCells}
    </tr>
  );
}
