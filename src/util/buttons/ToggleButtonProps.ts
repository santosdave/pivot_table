/**
 * The properties of a section toggle button in the pivot table.
 */
export interface ToggleButtonProps {
  /**
   * Indicates whether the button is enabled.
   *
   * If disabled, the button is rendered as a non-interactable, plain text
   * label.
   */
  enabled: boolean;

  /**
   * The icon to display in the button.
   */
  icon?: JSX.Element;

  /**
   * The button label.
   */
  label: string;

  /**
   * Fires when the user clicks the button.
   */
  onToggle: () => void;
}
