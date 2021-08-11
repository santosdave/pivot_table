import React from 'react';
import { Rows } from '../rows';
import { SubsectionProps } from './SubsectionProps';

/**
 * Retrieves the rows for the current subsection of the pivot table if the
 * current nesting level represents a complete combination of row dimension
 * values, or undefined otherwise.
 *
 * @param props The properties of the current subsection.
 *
 * @returns The rows for the current subsection, or undefined if an additional
 * subsection should be created instead.
 */
export function getSubsectionRows<T, M extends keyof T>(
  props: SubsectionProps<T, M>
): JSX.Element | undefined {
  const {
    columnDimensions,
    level,
    onCollapse,
    rowData,
    rowDimensions,
    subsectionData
  } = props;

  if (level === rowDimensions.length - 1) {
    return (
      <Rows
        columnDimensions={columnDimensions}
        onCollapse={onCollapse}
        rowData={rowData}
        subsectionData={subsectionData}
      />
    );
  }

  return undefined;
}
