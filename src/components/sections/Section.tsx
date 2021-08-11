import React from 'react';
import { getSectionTotalRow } from './getSectionTotalRow';
import { SectionProps } from './SectionProps';
import { SectionState } from './SectionState';
import Subsection from './Subsection';

/**
 * A top-level section of the pivot table.
 *
 * Displays the aggregate data for a single value of the first row dimension.
 */
export default class Section<T, M extends keyof T>
  extends React.Component<SectionProps<T, M>, SectionState> {
  /**
   * The current state of the pivot table section.
   */
  public state: SectionState = { open: true };

  /**
   * Collapses the section, hiding all of its contents except the total row.
   */
  private readonly handleCollapse = (): void => {
    this.setState({ open: false });
  };

  /**
   * Expands the section, showing all of its contents.
   */
  private readonly handleExpand = (): void => {
    this.setState({ open: true });
  };

  /**
   * Renders the pivot table section.
   *
   * @returns The rendered pivot table section.
   */
  public render(): JSX.Element {
    const {
      aggregator,
      columnDimensions,
      data,
      metric,
      rowData,
      rowDimensions,
      value
    } = this.props;

    const { open } = this.state;

    const rowProperty = rowDimensions[0].dimension.property;

    const sectionData = data.filter(record => record[rowProperty] === value);

    const sectionRowData = rowData.filter(
      ({ dimensionValues }) => dimensionValues[0].value === value
    );

    const multiple = sectionRowData.length > 1;

    const onCollapse = multiple ? this.handleCollapse : undefined;

    const subsection = open
      ? (
        <Subsection
          aggregator={aggregator}
          columnDimensions={columnDimensions}
          data={sectionData}
          dimensionValues={[]}
          level={0}
          metric={metric}
          onCollapse={onCollapse}
          rowData={sectionRowData}
          rowDimensions={rowDimensions}
          subsectionData={sectionRowData}
        />
      )
      : null;

    const total =
      multiple ? getSectionTotalRow(this.props, open, this.handleExpand) : null;

    return <>{subsection}{total}</>;
  }
}
