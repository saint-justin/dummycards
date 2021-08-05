import React, { useState } from 'react';

import './Entry.scss';

// Simple wrapper component for lazy label/input making
export default (props) => {
  const [val, setVal] = useState(props.placeholder);

  const cleanName = (str) => str.replaceAll(' ', '_').toLowerCase();
  const updateVal = (e) => {
    console.log(`CHANGED VALUE FOR ${cleanName(props.name)}: ${e.target.value}`);
    const newValue = parseInt(e.target.value, 10);
    setVal(newValue);
    props.update(newValue);
  };

  return (
    <>
      <label>{props.name}</label>
      <input placeholder={props.placeholder}
        id={cleanName(props.name)}
        type={props.type}
        value={val}
        onChange={updateVal}></input>
    </>
  );
};
