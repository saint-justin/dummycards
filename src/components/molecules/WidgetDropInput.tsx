import * as React from 'react';
import Label from '../atoms/Label';
import Dropdown from '../atoms/Dropdown';
import Input from '../atoms/Input';
import { DrawableProperty, WInput } from '../../utils/types';
import { cleanString } from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  drawableProp: DrawableProperty,
  options: string[],
  inputType?: string,
  placeholder?: string,
  action?: ((widgetInput: WInput) => void),
  defaultOption?: string,
  defaultValue?: string | number,
};

const WidgetDropdown = ({
  name, drawableProp, options, inputType, placeholder, action, defaultOption, defaultValue,
}: WDropdownProps): React.ReactElement => {
  // Input Change Handler
  const inputChange = (newValue: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetDropdown before action was set');
    action({ value: newValue, property: drawableProp });
  };

  return (
    <>
      <Label name={name} labelFor={`dropdown_${cleanString(name)}`} />
      <div>
        <Dropdown
          name={name}
          action={inputChange}
          options={options}
          defaultOption={defaultOption || options[0]}
        />
        <Input
          name={name}
          type={inputType || 'text'}
          placeholder={placeholder || 'placeholder text'}
          defaultValue={defaultValue || 10}
          action={inputChange}
        />
      </div>
    </>
  );
};

WidgetDropdown.defaultProps = {
  defaultOption: undefined,
  action: undefined,
  placeholder: undefined,
  defaultValue: 10,
  inputType: 'text',
};

export default WidgetDropdown;
