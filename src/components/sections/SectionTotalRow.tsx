import React from 'react';
import { ExpandButton } from '../../util/buttons';
import headingStyles from '../../styles/rowDimensionHeading.scss';
import { getSectionTotalRowColumns } from './getSectionTotalRowColumns';
import styles from '../../styles/SectionRowTotal.scss';
import { SectionTotalRowProps } from './SectionTotalRowProps';

const { rowDimensionHeading } = headingStyles;

/**
 * The total row for a section of the pivot table.
 *
 * Summarizes the dataset along only the column dimensions and a single value of
 * the top-level row dimension.
 *
 * @param props The properties of the section total row.
 *
 * @returns The rendered section total row.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export default function SectionTotalRow<T, M extends keyof T>(
  props: SectionTotalRowProps<T, M>
): JSX.Element {
  const { onExpand, open, rowDimensions, value } = props;

  const subdimensions = rowDimensions.slice(1);

  const label = `${String(value)} total`;

  const subdimensionCells = subdimensions.map(subdimension => (
    <th className={rowDimensionHeading} key={subdimension.dimension.name}>
      &nbsp;
    </th>
  ));

  const columnCells = getSectionTotalRowColumns(props);

  return (
    <tr className={styles.totalRow}>
      <th className={rowDimensionHeading}>
        <ExpandButton enabled={!open} label={label} onToggle={onExpand} />
      </th>

      {subdimensionCells}

      <td />

      {columnCells}
    </tr>
  );
}
