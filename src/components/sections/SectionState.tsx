/**
 * The state of a pivot table section.
 */
export interface SectionState {
  /**
   * Indicates whether the section contents are currently being displayed.
   *
   * Otherwise only the total row is visible.
   */
  open: boolean;
}
