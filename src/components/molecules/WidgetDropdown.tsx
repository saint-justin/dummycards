import * as React from 'react';
import Label from '../atoms/Label';
import Dropdown from '../atoms/Dropdown';
import { DrawableProperty, WInput } from '../../utils/types';
import { cleanString } from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  drawableProp: DrawableProperty,
  options: string[],
  action?: ((widgetInput: WInput) => void),
  defaultOption?: string,

};

const WidgetDropdown = ({
  name, drawableProp, options, action, defaultOption,
}: WDropdownProps): React.ReactElement => {
  // Input Change Handler
  const inputChange = (newValue: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetDropdown before action was set');
    action({ value: newValue, property: drawableProp });
  };

  return (
    <>
      <Label name={name} labelFor={`dropdown_${cleanString(name)}`} />
      <Dropdown
        name={name}
        action={inputChange}
        options={options}
        defaultOption={defaultOption || options[0]}
      />
    </>
  );
};

WidgetDropdown.defaultProps = {
  defaultOption: undefined,
  action: undefined,
};

export default WidgetDropdown;
