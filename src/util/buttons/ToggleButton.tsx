import React, { SyntheticEvent } from 'react';
import { ToggleButtonProps } from './ToggleButtonProps';
import styles from '../../styles/ToogleButtonProps.module.scss';

/**
 * A button that toggles the visibility of a section of the pivot table.
 */
export default class ToggleButton extends React.Component<ToggleButtonProps> {
  /**
   * Blurs the button and fires the onToggle event.
   *
   * @param event The triggering event.
   */
  private readonly handleToggle = (event: SyntheticEvent): void => {
    const { onToggle } = this.props;

    const target = event.target as HTMLElement;

    target.blur();

    target.parentElement?.blur();

    onToggle();
  };

  /**
   * Renders the toggle button.
   *
   * @returns The rendered toggle button.
   */
  public render(): JSX.Element {
    const { enabled, icon, label } = this.props;

    const { handleToggle } = this;

    const button = enabled ? <span className={styles.icon}>{icon}</span> : '';

    return (
      <div
        className={`${styles.button} ${enabled ? styles.enabled : ''}`}
        onClick={handleToggle}
        onKeyPress={handleToggle}
        role={enabled ? 'button' : undefined}
        tabIndex={enabled ? 0 : undefined}
      >
        {button}

        <span className={styles.label}>{label}</span>
      </div>
    );
  }
}
