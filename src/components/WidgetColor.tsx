import * as React from 'react';
import { useState } from 'react';
import { WInput, DrawableProperty } from '../types' 

type WidgetDropdown = {
  name: string,
  options: string[],
  placeholder?: string,
  value?: string | number,
  type?: string,
  action?: ((widgetInput: WInput) => void),
}

export default (props:WidgetDropdown): React.ReactElement  => {
  const [value, setValue] = useState(props.value);

  // Helper fxn to clean names for use as ID's
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const inputRef = React.createRef<HTMLInputElement>();

  // Input Change Handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    if (!props.action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    props.action({ value: target.value, property: 'fillStyle'});
  }

  return (
    <>
      <label>{props.name}</label>
      <input
        placeholder={props.placeholder}
        id={'color_' + cleanName(props.name)}
        type={props.type}
        value={value}
        onChange={inputChange}
        ref={inputRef} 
      > </input>
    </>
  )
}