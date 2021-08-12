import React from 'react';
import rowDimensionStyles from '../../styles/rowDimensionHeading.module.scss';
import columnStyles from '../../styles/columnCell.module.scss';
import styles from '../../styles/Heading.module.scss';
import { HeadingProps } from './HeadingProps';
import rowStyles from '../../styles/tableHeadingRow.module.scss';

const { columnCell } = columnStyles;

const { rowDimensionHeading, rowDimensionLastHeading } = rowDimensionStyles;

/**
 * The heading row for the pivot table.
 *
 * @param props The heading row props.
 *
 * @returns The rendered heading row.
 */
export default function Heading<T>(props: HeadingProps<T>): JSX.Element {
  const { columnDimensions, rowDimensions } = props;

  const [column] = columnDimensions;

  const columnCells = column.values.length > 0
    ? column.values.map(String).map(
        (      value: any) => <th className={columnCell} key={value}>{value}</th>
    )
    : <th />;

  const rowCells = rowDimensions.map(({ dimension }, i) => {
    const last = i === rowDimensions.length - 1;

    const { name } = dimension;

    const rowLastHeading = last ? rowDimensionLastHeading : '';

    const className = `${rowDimensionHeading} ${rowLastHeading}`;

    return <th className={className} key={name}>{name}</th>;
  });

  return (
    <tr className={`${styles.heading} ${rowStyles.tableHeadingRow}`}>
      {rowCells}

      <td />

      {columnCells}
    </tr>
  );
}
