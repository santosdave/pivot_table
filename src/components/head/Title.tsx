import React from 'react';
import rowDimensionStyles from '../../styles/rowDimensionHeading.scss';
import rowStyles from '../../styles/tableHeadingRow.scss';
import styles from '../../styles/Title.scss';
import { TitleProps } from './TitleProps';

const { rowDimensionHeading, rowDimensionLastHeading } = rowDimensionStyles;

/**
 * The title row for the pivot table, including one specified title for the
 * column section and one for the row section.
 *
 * Renders nothing if no titles are specified.
 *
 * @param props The title row properties.
 *
 * @returns The rendered title row, or null if no title strings are specified.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export default function Title<T, M extends keyof T>(
  props: TitleProps<T, M>
): JSX.Element | null {
  const { columnDimensions, rowDimensions, title } = props;

  const { column, row } = title ?? {};

  const [columnDimension] = columnDimensions;

  const show: boolean = Boolean(column) || Boolean(row);

  if (show) {
    return (
      <tr className={`${styles.title} ${rowStyles.tableHeadingRow}`}>
        <th
          className={`${rowDimensionHeading} ${rowDimensionLastHeading}`}
          colSpan={rowDimensions.length}
        >
          {row}
        </th>

        <td />

        <th colSpan={columnDimension.values.length}>{column}</th>
      </tr>
    );
  }

  return null;
}
