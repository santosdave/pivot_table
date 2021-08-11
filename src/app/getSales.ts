import {Sales} from "./Sales"
import sales from "./sales.json";

/**
 * Retrieves the sales to aggregate in the pivot table.
 *
 * @returns A promise that resolves with the orders.
 */
export async function getSales(): Promise<Sales[]> {
  return Promise.resolve(sales);
}