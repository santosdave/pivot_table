import React from 'react';
import Row from './Row';
import { RowsProps } from './RowsProps';

/**
 * Rows representing complete sets of dimension values to display in the pivot
 * table.
 *
 * @param props The properties of the rows.
 *
 * @returns The rendered rows.
 *
 * @template T The type of record comprising the dataset being aggregated.
 */
export default function Rows<T>(props: RowsProps<T>): JSX.Element {
  const {
    columnDimensions,
    onCollapse,
    rowData,
    subsectionData
  } = props;

  const startIndex = rowData.indexOf(subsectionData[0]);

  const rowElements = subsectionData.map(({ data, dimensionValues }, i) => {
    const key = String(dimensionValues[dimensionValues.length - 1].value);

    const nextDimensionValues = rowData[startIndex + i + 1]?.dimensionValues;

    const previousDimensionValues =
      rowData[startIndex + i - 1]?.dimensionValues;

    return (
      <Row
        columnDimensions={columnDimensions}
        dimensionValues={dimensionValues}
        key={key}
        nextDimensionValues={nextDimensionValues}
        onCollapse={onCollapse}
        previousDimensionValues={previousDimensionValues}
        values={data}
      />
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{rowElements}</>;
}
