import * as React from 'react';
import { useState } from 'react';
import * as _ from 'lodash';

import Label from '../atoms/Label';
import Dropdown from '../atoms/Dropdown';
import { DrawableProperty, WInput } from '../../utils/types';

type WDropdownProps = {
  name: string,
  drawableProp: DrawableProperty,
  options: string[],
  action?: ((widgetInput: WInput) => void),
  defaultOption?: string,

};

const WidgetDropdown = (props: WDropdownProps): React.ReactElement => {
  const {
    name, drawableProp, options, action, defaultOption,
  } = props;
  const [id] = useState(_.uniqueId(`${name}_`));

  // Input Change Handler
  const inputChange = (newValue: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetDropdown before action was set');
    action({ value: newValue, property: drawableProp });
  };

  return (
    <>
      <Label name={name} labelFor={id} />
      <Dropdown
        name={name}
        id={id}
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
