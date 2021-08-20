import * as React from 'react';
import { useState } from 'react';
import { Size } from '../types' 

type WidgetDropdown = {
  name: string,
  options: string[],
  placeholder?: string,
  value?: string | number,
  type?: string,
  action?: ((s: string | void) => void),
}

export default (props:WidgetDropdown): React.ReactElement  => {
  const [value, setValue] = useState(props.value);
  const [centerSelected, setCenterSelected] = useState<boolean>(false);

  // Helper fxn to clean names for use as ID's
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const inputRef = React.createRef<HTMLInputElement>();

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    if (!props.action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    props.action(target.value);
  }

  const handleSelectChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e) {
      console.error('Error: Select handle event returned faulty value');
      return;
    }

    if (e.target.value === 'center') setCenterSelected(true);
    else setCenterSelected(false);
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
        disabled={centerSelected}>
      </input>
    </>
  )
}