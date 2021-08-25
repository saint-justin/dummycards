import { update } from 'lodash';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DrawableProperty, WInput } from '../types' 

type WidgetDropdown = {
  name: string,
  options: string[],
  initialProperty: DrawableProperty,
  placeholder?: string,
  value?: string | number,
  type?: string,
  input? : boolean,
  action?: ((input: WInput) => void),
}

export default (props:WidgetDropdown): React.ReactElement  => {
  const [widgetProperty, setWidgetProperty] = useState<DrawableProperty>(props.initialProperty);
  const [value, setValue] = useState(props.value);
  const [lastValue, setLastValue] = useState(props.value);
  const inputRef = React.createRef<HTMLInputElement>();
  const selectRef = React.createRef<HTMLSelectElement>();

  // Helper fxns to clean names and generate option boxes from strings
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const generateOptions = (options: string[]) => options.map((s: string): JSX.Element => <option value={s.toLowerCase()} key={s}>{s}</option>);

  // Event for handling input changes
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    if (!props.action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  }

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e) {
      console.error('Error: Select handle event returned faulty value');
      return;
    }

    // Handling for strict dropdowns
    if (!props.input) {
      setValue(e.target.value);
      return;
    }

    // Slot valid values into the widget property or error out for illegal ones
    const target = e.target as HTMLSelectElement;
    if (target.value === 'center') { 
      if (value !== undefined) setLastValue(value.toString());
      setValue('');
      setWidgetProperty('left');
      return;
    } else if (target.value === 'top' || target.value === 'bottom' || target.value === 'left' || target.value === 'right'){
      if (value === 'center') setValue(lastValue);
      setWidgetProperty(target.value);
    } else {
      console.error('Error: Illegal widget property set in dropdown');
      return;
    }
  }

  // Updates parent given a value or widgetprop change
  useEffect(() => {
    if (!props.action) return;
    props.action({ value: value?.toString() || '', property: widgetProperty })
  }, [value, widgetProperty])

  return (
    <>
      <label>{props.name}</label>
      <div className='flex-row'>
        <select 
          id={'select_' + cleanName(props.name)} 
          onChange={handleSelectChange} 
          ref={selectRef} 
          defaultValue={props.value}
          className={!props.input ? 'spread' : ''}>
          {generateOptions(props.options)}
        </select>
        {/* Only display the input section if needed */}
        { props.input && 
        <input
          placeholder={props.placeholder}
          id={'input_' + cleanName(props.name)}
          type={props.type}
          value={value}
          onChange={inputChange}
          ref={inputRef}
          disabled={value === 'center'}>
        </input>}
      </div>
    </>
  )
}