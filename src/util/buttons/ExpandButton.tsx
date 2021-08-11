import React from 'react';
import ToggleButton from './ToggleButton';
import { ToggleButtonProps } from './ToggleButtonProps';

/**
 * A button to expand a closed section of the pivot table.
 *
 * @param props The button properties.
 *
 * @returns The rendered expand button.
 */
export default function ExpandButton(props: ToggleButtonProps): JSX.Element {
  const { enabled, label, onToggle } = props;

  return (
    <ToggleButton
      enabled={enabled}
      icon={<>&#43;</>}
      label={label}
      onToggle={onToggle}
    />
  );
}
