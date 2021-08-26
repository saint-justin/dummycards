import * as React from 'react';
import { useState, useEffect } from 'react';
import { DrawableProperty, WInput } from '../../types';

type WDropdownProps = {
  name: string,
  options: string[],
  initialProperty: DrawableProperty,
  defaultValue: string | number,
  placeholder?: string,
  type?: string,
  isInput? : boolean,
  action?: ((input: WInput) => void),
};

const WidgetDropdown = (props: WDropdownProps): React.ReactElement => {
  // Obj destructuring
  const {
    name,
    options,
    initialProperty,
    placeholder,
    defaultValue,
    type,
    isInput,
    action,
  } = props;

  // Initial states
  const [widgetProperty, setWidgetProperty] = useState<DrawableProperty>(initialProperty);
  const [value, setValue] = useState(placeholder || defaultValue);
  const [lastValue, setLastValue] = useState(defaultValue);

  // Refs to input and select elements
  const inputRef = React.createRef<HTMLInputElement>();
  const selectRef = React.createRef<HTMLSelectElement>();

  // Helper fxns to clean names and generate option boxes from strings
  const cleanName = (str: string): string => `entry_ ${str.replace(/\s/g, '_').toLowerCase()}`;
  const generateOptions = (opts: string[]) => opts.map(
    (s: string): JSX.Element => <option value={s.toLowerCase()} key={s}>{s}</option>,
  );

  // Event for handling input changes
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e) {
      console.error('Error: Select handle event returned faulty value');
      return;
    }

    // Handling for strict dropdowns
    if (!isInput) {
      setValue(e.target.value);
      return;
    }

    // Slot valid values into the widget property or error out for illegal ones
    const target = e.target as HTMLSelectElement;
    if (target.value === 'center') {
      if (value !== undefined) setLastValue(value.toString());
      setValue('');
      setWidgetProperty('left');
    } else if (target.value === 'top' || target.value === 'bottom' || target.value === 'left' || target.value === 'right') {
      if (value === 'center') setValue(lastValue?.toString());
      setWidgetProperty(target.value);
    } else {
      console.error('Error: Illegal widget property set in dropdown');
    }
  };

  // Updates parent given a value or widgetprop change
  useEffect(() => {
    if (!action) return;
    action({ value: value?.toString() || '', property: widgetProperty });
  }, [value, widgetProperty]);

  return (
    <>
      <label htmlFor={`select_${cleanName(name)}`}>{name}</label>
      <div className="flex-row" id={`select_${cleanName(name)}`}>
        <select
          onChange={handleSelectChange}
          ref={selectRef}
          defaultValue={value}
          className={!isInput ? 'spread' : ''}
        >
          {generateOptions(options)}
        </select>
        {/* Only display the input section if needed */}
        { isInput
        && (
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={inputChange}
          ref={inputRef}
          disabled={value === 'center'}
        />
        )}
      </div>
    </>
  );
};

WidgetDropdown.defaultProps = {
  placeholder: undefined,
  type: undefined,
  action: undefined,
  isInput: false,
};

export default WidgetDropdown;
