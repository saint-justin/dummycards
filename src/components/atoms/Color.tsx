import * as React from 'react';
import { useState } from 'react';
import { WInput } from '../../types';

type WDropdownProps = {
  name: string,
  defaultValue?: string | number,
  action?: ((widgetInput: WInput) => void),
};

const WidgetDropdown = ({ name, defaultValue, action }: WDropdownProps): React.ReactElement => {
  const [value, setValue] = useState(defaultValue);

  // Helper fxn to clean names for use as ID's
  const cleanName = (str: string): string => `entry_ ${str.replace(/\s/g, '_').toLowerCase()}`;
  const inputRef = React.createRef<HTMLInputElement>();

  // Input Change Handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    action({ value: target.value, property: 'fillStyle' });
  };

  return (
    <>
      <label htmlFor={`color_${cleanName(name)}`}>{name}</label>
      <input
        id={`color_${cleanName(name)}`}
        type="color"
        value={value}
        onChange={inputChange}
        ref={inputRef}
      />
    </>
  );
};

WidgetDropdown.defaultProps = {
  defaultValue: '#000000',
  action: undefined,
};

export default WidgetDropdown;
