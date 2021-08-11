import React from 'react';
import ToggleButton from './ToggleButton';
import { ToggleButtonProps } from './ToggleButtonProps';

/**
 * A button to collapse a section of the pivot table.
 *
 * @param props The button properties.
 *
 * @returns The rendered collapse button.
 */
export default function CollapseButton(props: ToggleButtonProps): JSX.Element {
  const { label, onToggle } = props;

  return (
    <ToggleButton
      enabled
      icon={<>&#8722;</>}
      label={label}
      onToggle={onToggle}
    />
  );
}
