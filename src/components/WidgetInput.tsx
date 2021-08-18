import * as React from 'react';
import { useState } from 'react';
import { Size } from '../types' 

type WidgetInput = {
  name: string,
  placeholder?: string,
  value?: string | number,
  type?: string,
  action?: ((s: string | void) => void),
}

export default (props:WidgetInput): React.ReactElement  => {
  const [value, setValue] = useState(props.value);

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

  const buttonClicked = ():void => {
    if (!props.action) {
      console.error('Error: No function is assigned to button clicked');
      return;
    }
    props.action();
  }

  return (
    <>
      {/* Disable labels for buttons */}
      { props.type !== 'button' && <label>{props.name}</label>}
      { props.type === 'button' ?
        <button
        id={cleanName(props.name)}
        onClick={buttonClicked}
        >{props.name}</button>
        :
        <input placeholder={props.placeholder}
        id={cleanName(props.name)}
        type={props.type}
        value={value}
        onChange={inputChange}
        ref={inputRef}></input>
        }
    </>
  )
}