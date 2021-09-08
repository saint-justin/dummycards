import * as React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';

import Dropdown from '../atoms/Dropdown';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import { WInput } from '../../utils/types';

import './styles/WidgetPositional.scss';

type PositionalOption = 'left' | 'right' | 'top' | 'bottom' | 'center';

type WDropdownProps = {
  name: string,
  defaultValue: string | number,
  positionalType: 'horizontal' | 'vertical',
  defaultOption: PositionalOption,
  placeholder?: string,
  action?: ((widgetInput: WInput) => void),
};

const WidgetDropdown = (props: WDropdownProps): JSX.Element => {
  const {
    name, positionalType, placeholder, action, defaultOption, defaultValue,
  } = props;

  const [id] = useState(_.uniqueId(name));
  const [value, setValue] = useState<string>(defaultValue.toString());
  const [activeOpt, setActiveOpt] = useState<PositionalOption>(defaultOption);
  const [options, setOptions] = useState<string[]>([]);

  // Input Change Handler
  const inputChange = (newValue: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetDropdown before action was set');
    if (['left', 'right', 'top', 'bottom', 'center'].includes(newValue)) {
      const typedValue = newValue as PositionalOption;
      setActiveOpt(typedValue);

      switch (newValue) {
        case 'left':
          action({ property: 'left', value });
          action({ property: 'right', value: 'none' });
          break;
        case 'top':
          action({ property: 'bottom', value: 'none' });
          action({ property: 'top', value });
          break;
        case 'center':
          if (positionalType === 'horizontal') {
            action({ property: 'left', value: 'center' });
            action({ property: 'right', value: 'none' });
            break;
          } else {
            action({ property: 'top', value: 'center' });
            action({ property: 'bottom', value: 'none' });
            break;
          }
        case 'right':
          action({ property: 'left', value: 'none' });
          action({ property: 'right', value });
          break;
        case 'bottom':
          action({ property: 'bottom', value });
          action({ property: 'top', value: 'none' });
          break;
        default:
          throw new Error(`Illegal value '${newValue}' passed to WidgetPositional (${name})`);
      }
    } else {
      setValue(newValue);

      if (activeOpt === 'center') throw new Error(`Attempted to set a value '${value}' while centered in WidgetPositional (${name})`);
      action({ property: activeOpt, value: newValue });
    }
  };

  // Initialize dropdown options based on whether this is vertical or horizontal
  useEffect(() => {
    const drops = positionalType === 'horizontal'
      ? ['left', 'center', 'right']
      : ['top', 'center', 'bottom'];
    setOptions(drops);
  }, []);

  return (
    <>
      <Label name={name} labelFor={id} />
      <div className="widget-positional" id={id}>
        <Dropdown
          id={_.uniqueId('dropdown_')}
          name={name}
          action={inputChange}
          options={options}
          defaultOption={defaultOption || options[0]}
        />
        <Input
          id={_.uniqueId('input_')}
          type="text"
          placeholder={placeholder || 'placeholder text'}
          defaultValue={defaultValue || 10}
          action={inputChange}
          disabled={activeOpt === 'center'}
        />
      </div>
    </>
  );
};

WidgetDropdown.defaultProps = {
  action: undefined,
  placeholder: undefined,
};

export default WidgetDropdown;
