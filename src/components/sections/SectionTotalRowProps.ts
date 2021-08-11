import { AggregatorProps } from '../../util/aggregation';

/**
 * The properties of a section's total row.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export interface SectionTotalRowProps<T, M extends keyof T>
  extends AggregatorProps<T, M> {
  /**
   * Fired when the user attempts to expand the section.
   */
  onExpand: () => void;

  /**
   * Indicates whether the section is currently expanded.
   */
  open: boolean;

  /**
   * The value of the top-level row dimension being aggregated in the section.
   */
  value: unknown;
}
