import React from 'react';
import { CollapseButton } from '../../util/buttons';
import headingStyles from '../../styles/rowDimensionRowHeading.scss';
import { RowLabelVisibility } from './RowLabelVisibility';

const { rowDimensionRowHeading, rowDimensionRowLastHeading } = headingStyles;

/**
 * Retrieves the label cells to display in the pivot table for a row
 * representing a full combination of row dimension values, optionally including
 * a collapse button in the first dimension's cell.
 *
 * @param labelVisibility Each dimension value's label and intended visibility.
 * @param onCollapse A function to call when a collapse button in the first
 * dimension's label is clicked. If specified, a collapse button is included
 * with the first dimension's label.
 *
 * @returns The label cells.
 */
export function getRowLabelCells(
  labelVisibility: RowLabelVisibility[],
  onCollapse?: () => void
): JSX.Element[] {
  const cells = labelVisibility.map(({ label, visible }, i) => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let content: string | JSX.Element;

    const last =
      i < labelVisibility.length - 1 ? '' : rowDimensionRowLastHeading;

    if (visible) {
      content = i === 0 && onCollapse !== undefined
        ? <CollapseButton enabled label={label} onToggle={onCollapse} />
        : label;
    } else {
      content = <>&nbsp;</>;
    }

    return (
      <th className={`${last} ${rowDimensionRowHeading}`} key={label}>
        {content}
      </th>
    );
  });

  return cells;
}
