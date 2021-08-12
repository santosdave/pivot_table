import React from 'react';
import { DimensionValues } from '../../util/dimensions';
import columnCellStyles from '../../styles/columnCell.module.scss';

const { columnCell } = columnCellStyles;

/**
 * Retrieves the column cell elements to display in a row of the pivot table for
 * the specified data and the specified column dimension values.
 *
 * Only applicable to rows representing a full set of row dimension values.
 *
 * @param data The data to include in the cells.
 * @param dimensionValues The column dimension values that the data represents.
 *
 * @returns The cells to display in the row.
 *
 * @template T The type of record in the dataset being aggregated.
 */
export function getRowColumnCells<T>(
  data: readonly string[],
  dimensionValues: [DimensionValues<T>]
): JSX.Element[] {
  const [columnDimensionValues] = dimensionValues;

  return data.map((aggregate, i) => (
    <td
      className={columnCell}
      key={String(columnDimensionValues.values[i])}
    >
      {aggregate}
    </td>
  ));
}
