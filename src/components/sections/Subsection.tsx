import React from 'react';
import { getSubsectionRows } from './getSubsectionRows';
import { SubsectionProps } from './SubsectionProps';

/**
 * A nestable section within the pivot table aggregating data for given row
 * dimension values.
 *
 * If the given zero-based nesting level indicates the final row dimension,
 * renders the rows aggregating the full combination of dimension values.
 * Otherwise renders a new nested subsection for each value of the row dimension
 * indicated by the given nesting level.
 *
 * @param props The pivot table subsection.
 *
 * @returns The rendered pivot table subsection.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export default function Subsection<T, M extends keyof T>(
  props: SubsectionProps<T, M>
): JSX.Element {
  const {
    aggregator,
    columnDimensions,
    data,
    dimensionValues,
    level,
    metric,
    onCollapse,
    rowData,
    rowDimensions
  } = props;

  const dimension = rowDimensions[level];

  const rows = getSubsectionRows(props);

  if (rows !== undefined) {
    return rows;
  }

  const subsections: JSX.Element[] =
    dimension.values.map((value: unknown): JSX.Element => {
      const subSubsectionData =
        rowData.filter(row => row.dimensionValues[level].value === value);

      return (
        <Subsection
          aggregator={aggregator}
          columnDimensions={columnDimensions}
          data={data}
          dimensionValues={
            [...dimensionValues, { dimension: dimension.dimension, value }]
          }
          key={String(value)}
          level={level + 1}
          metric={metric}
          onCollapse={onCollapse}
          rowData={rowData}
          rowDimensions={rowDimensions}
          subsectionData={subSubsectionData}
        />
      );
    });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{subsections}</>;
}
