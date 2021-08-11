import { finishAggregateNumber } from './finishAggregateNumber';

/**
 * Converts the specified value to its final string representation to display in
 * the pivot table.
 *
 * @param value The value to convert.
 *
 * @returns The final string representation of the value to display in the pivot
 * table.
 */
export function finishAggregate(value: unknown): string {
  switch (typeof value) {
    case 'number':
      return finishAggregateNumber(value);
    default:
      return String(value);
  }
}
