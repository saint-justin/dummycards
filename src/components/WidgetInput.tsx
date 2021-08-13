import * as React from 'react';
// import { useState } from 'react';

type WidgetInput = {
  name: string,
  placeholder: string,
  value?: string | number,
  type?: string,
  // getValue: , //Get back to this bad boi
}

export default (props:WidgetInput): React.ReactElement  => {
  // Helper fxn to clean up names entered
  const cleanName = (str: string): string => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <>
      <label>{props.name}</label>
      <input placeholder={props.placeholder}
        id={cleanName(props.name)}
        type={props.type}
        value={props.value}
        onChange={()=>{ console.log('Changed!'); }}
        ref={inputRef} ></input>
    </>
  )
}