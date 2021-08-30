import * as React from 'react';
import { useState } from 'react';
import { cleanString } from '../../utils/Helpers';

type WInputProps = {
  name: string,
  type: string,
  placeholder?: string,
  defaultValue?: string | number,
  action?: ((s: string) => void),
};

const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, type, placeholder, defaultValue, action,
  } = props;

  const [value, setValue] = useState(defaultValue);

  // Change Event input handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    action(target.value.toString());
    setValue(target.value);
  };

  return (
    <input
      placeholder={placeholder}
      id={`input_${cleanString(name)}`}
      value={value}
      type={type}
      onChange={inputChange}
    />
  );
};

WidgetInput.defaultProps = {
  placeholder: 'info goes here',
  defaultValue: '',
  action: undefined,
};

export default WidgetInput;
