import * as React from 'react';
import { useState , useEffect } from 'react';
import { DrawableProperty, WInput } from '../types' 

type WidgetInput = {
  name: string,
  property: DrawableProperty,
  placeholder?: string,
  value?: string | number,
  type?: string,
  action?: ((updateInfo: WInput) => void),
}

export default (props:WidgetInput): React.ReactElement  => {
  const [value, setValue] = useState(props.value);
  const inputRef = React.createRef<HTMLInputElement>();

  // Helper fxn to clean names for use as ID's
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;

  // Change Event input handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    if (!props.action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  }

  // Event handler for button being clicked
  const buttonClicked = ():void => {
    if (!props.action) {
      console.error('Error: No function is assigned to button clicked');
      return;
    }
  }

  // Watch the state of Value and update parent w/ any changes to it
  useEffect(() => {
    if (value === undefined || !props.action) {
      console.error('Error: Unable to update widget\'s value in because widget\'s value or props.action is undefined.');
      return;
    }
    props.action({ value: value.toString(), property: props.property});
  }, [value]);

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
        <input 
          placeholder={props.placeholder}
          id={cleanName(props.name)}
          type={props.type}
          value={value}
          onChange={inputChange}
          ref={inputRef}
        ></input>
        }
    </>
  )
}