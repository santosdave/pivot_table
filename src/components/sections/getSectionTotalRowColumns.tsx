import React from 'react';
import { aggregate } from '../../util/aggregation';
import columnCellStyles from '../../styles/columnCell.scss';
import { SectionTotalRowProps } from './SectionTotalRowProps';

/**
 * Retrieves the column cells for a section total row.
 *
 * @param props The properties determining the cells to create.
 *
 * @returns The column cells for the section total row.
 */
export function getSectionTotalRowColumns<T, M extends keyof T>(
  props: SectionTotalRowProps<T, M>
): JSX.Element[] {
  const {
    aggregator,
    columnDimensions,
    data,
    metric,
    rowDimensions,
    value
  } = props;

  const [column] = columnDimensions;

  const [dimension] = rowDimensions;

  const columnProperty = column.dimension.property;

  const rowProperty = dimension.dimension.property;

  const sectionData = data.filter((record => record[rowProperty] === value);

  return column.values.map((val: any) => {
    const aggregateValue = aggregate(
      sectionData.filter((record: { [x: string]: any; }) => record[columnProperty] === val),
      metric,
      aggregator
    );

    return (
      <td className={columnCellStyles.columnCell} key={String(val)}>
        {aggregateValue}
      </td>
    );
  });
}
