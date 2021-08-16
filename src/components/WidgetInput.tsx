import * as React from 'react';
// import { useState } from 'react';

type WidgetInput = {
  name: string,
  placeholder?: string,
  value?: string | number,
  type?: string,
  button?: boolean,
  // getValue: , //Get back to this bad boi
}

export default (props:WidgetInput): React.ReactElement  => {
  // Helper fxn to clean names for use as ID's
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <>
      <label>{props.name}</label>
      { props.button ?
        <button
        id={cleanName(props.name)}
        onClick={()=>{ console.error('Button fxn not yet implemented.')}}
        >I'm a button!</button>
        :
        <input placeholder={props.placeholder}
        id={cleanName(props.name)}
        type={props.type}
        value={props.value}
        onChange={()=>{ console.error('Onchange input not yet implemented.'); }}
        ref={inputRef} ></input>
        }
    </>
  )
}