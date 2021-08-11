/**
 * Converts the specified number to its final string representation to display
 * in the pivot table.
 *
 * Rounds the number to the nearest whole number and inserts a comma to every
 * thousands index.
 *
 * @param value The value to convert.
 *
 * @returns The final string representation of the value to display in the pivot
 * table.
 */
export function finishAggregateNumber(value: number): string {
  const rounded = Math.round(value);

  const thousands = 3;

  const digits = String(rounded).split('');

  for (let i = digits.length - thousands; i > 0; i -= thousands) {
    digits.splice(i, 0, ',');
  }

  return digits.join('');
}
