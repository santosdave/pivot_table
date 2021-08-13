import React from 'react';
import './App.css';
import {Sales} from "./Sales";
import {getSales} from "./getSales";
import PivotTable, { aggregators, Dimension } from "../util"
/**
 * The root application element.
 *
 * @returns The root element of the application.
 */

 export default class App extends React.Component {
  /**
   * Loads the sales data after the component is loaded.
   *
   * @returns A promise that resolves when the sales data have been loaded.
   */
  public async componentDidMount(): Promise<void> {
    this.salesData = await getSales();

    this.setState({}); // eslint-disable-line react/no-did-mount-set-state
  }

  /**
   * The sales data  to aggregate in the pivot table.
   */
  private salesData: Sales[] = [];

  /**
   * Renders the app.
   *
   * @returns The rendered app.
   */
  /**
   * The fields that represent the columns of the table.
   */
  public render(): JSX.Element {
    const columnDimensions: [Dimension<Sales>] = [
      { name: 'State', property: 'state' }
    ];
    /**
   * The fields that represent the rows of the table.
   */
    const rowDimensions: Array<Dimension<Sales>> = [
      { name: 'Category', property: 'category' },
      { name: 'Sub-Category', property: 'subCategory' }
    ];
  /**
   * The fields that represent the main titles  on columns of the table.
   */
    const title = {
      column: 'States',
      row: 'Products'
    };

    return (
      <PivotTable
        aggregator={aggregators.sum}
        columnDimensions={columnDimensions}
        data={this.salesData}
        metric='sales'
        rowDimensions={rowDimensions}
        title={title}
      />
    );
  }
}

