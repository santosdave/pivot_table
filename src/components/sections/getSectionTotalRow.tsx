import React from 'react';
import { SectionProps } from './SectionProps';
import SectionTotalRow from './SectionTotalRow';

/**
 * Retrieves the total row for the section of the pivot table represented by the
 * specified properties.
 *
 * @param props The properties of the section that the total row summarizes.
 * @param open Indicates whether the section is currently expanded.
 * @param onExpand The function to call when the user expands the section.
 *
 * @returns The total row for the section.
 *
 * @template T The type of record in the dataset to aggregate.
 * @template M The property of {@link T} to aggregate.
 */
export function getSectionTotalRow<T, M extends keyof T>(
  props: SectionProps<T, M>,
  open: boolean,
  onExpand: () => void
): JSX.Element {
  const {
    aggregator,
    columnDimensions,
    data,
    metric,
    rowDimensions,
    value
  } = props;

  return (
    <SectionTotalRow
      aggregator={aggregator}
      columnDimensions={columnDimensions}
      data={data}
      metric={metric}
      onExpand={onExpand}
      open={open}
      rowDimensions={rowDimensions}
      value={value}
    />
  );
}
