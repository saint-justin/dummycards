import * as React from 'react';
import { useState, useEffect } from 'react';
import * as helper from '../utils/Helpers';
import { DrawableProperty, WInput } from '../types';

type WInputProps = {
  name: string,
  property: DrawableProperty,
  placeholder?: string,
  defaultValue?: string | number,
  type?: string,
  action?: ((updateInfo: WInput) => void),
};

const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, property, placeholder, defaultValue, type, action,
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

  // Event handler for button being clicked
  const buttonClicked = ():void => {
    if (!action) {
      console.error('Error: No function is assigned to button clicked');
    }
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
      {/* Disable labels for buttons */}
      { type !== 'button' && <label htmlFor={helper.default.cleanString(name)}>{name}</label>}
      {/* If this is assigned to be a button, make it a button. If not, it's a generic input */}
      { type === 'button'
        ? (
          <button
            type="submit"
            id={helper.default.cleanString(name)}
            onClick={buttonClicked}
          >
            {name}
          </button>
        )
        : (
          <input
            placeholder={placeholder}
            id={helper.default.cleanString(name)}
            type={type}
            value={value}
            onChange={inputChange}
            ref={inputRef}
          />
        )}
    </>
  );
};

WidgetInput.defaultProps = {
  placeholder: 'info goes here',
  defaultValue: undefined,
  type: undefined,
  action: undefined,
};

export default WidgetInput;
