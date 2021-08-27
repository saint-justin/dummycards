import * as React from 'react';
import { useState, useEffect } from 'react';
import * as helper from '../../utils/Helpers';
import { DrawableProperty, WInput } from '../../types';

type WInputProps = {
  name: string,
  property: DrawableProperty,
  type?: string,
  labeled?: boolean,
  placeholder?: string,
  defaultValue?: string | number,
  action?: ((updateInfo: WInput) => void),
};

const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, property, type, labeled, placeholder, defaultValue, action,
  } = props;
  const [value, setValue] = useState(defaultValue);
  const inputRef = React.createRef<HTMLInputElement>();

  // Change Event input handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  // Watch the state of Value and update parent w/ any changes to it
  useEffect(() => {
    if (value === undefined || !action) {
      console.error('Error: Unable to update widget\'s value in because widget\'s value or action is undefined.');
      return;
    }
    action({ value: value.toString(), property });
  }, [value]);

  return (
    <>
      {labeled && <label htmlFor={helper.default.cleanString(name)}>{name}</label>}
      <input
        placeholder={placeholder}
        id={helper.default.cleanString(name)}
        value={value}
        type={type}
        onChange={inputChange}
        ref={inputRef}
      />
    </>
  );
};

WidgetInput.defaultProps = {
  placeholder: 'info goes here',
  defaultValue: undefined,
  action: undefined,
  labeled: true,
  type: 'text',
};

export default WidgetInput;
