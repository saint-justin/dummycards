import * as React from 'react';
import { useState } from 'react';

type WInputProps = {
  id: string,
  type: string,
  disabled?: boolean,
  placeholder?: string,
  defaultValue?: string | number,
  action?: ((s: string) => void),
};

const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    id, type, disabled, placeholder, defaultValue, action,
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
      id={id}
      value={value}
      type={type}
      onChange={inputChange}
      disabled={disabled}
    />
  );
};

WidgetInput.defaultProps = {
  disabled: false,
  placeholder: 'info goes here',
  defaultValue: '',
  action: undefined,
};

export default WidgetInput;
