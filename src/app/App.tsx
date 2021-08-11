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
   * Loads the sales order data after the component is loaded.
   *
   * @returns A promise that resolves when the sales orders have been loaded.
   */
  public async componentDidMount(): Promise<void> {
    this.orders = await getSales();

    this.setState({}); // eslint-disable-line react/no-did-mount-set-state
  }

  /**
   * The sales orders to aggregate in the pivot table.
   */
  private orders: Sales[] = [];

  /**
   * Renders the app.
   *
   * @returns The rendered app.
   */
  public render(): JSX.Element {
    const columnDimensions: [Dimension<Sales>] = [
      { name: 'State', property: 'state' }
    ];

    const rowDimensions: Array<Dimension<Sales>> = [
      { name: 'Category', property: 'category' },
      { name: 'Sub-Category', property: 'subCategory' }
    ];

    const title = {
      column: 'States',
      row: 'Products'
    };

    return (
      <PivotTable
        aggregator={aggregators.sum}
        columnDimensions={columnDimensions}
        data={this.orders}
        metric='sales'
        rowDimensions={rowDimensions}
        title={title}
      />
    );
  }
}

