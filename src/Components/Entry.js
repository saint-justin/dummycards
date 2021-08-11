import React, { useState } from 'react';

import './Entry.scss';

// Simple wrapper component for lazy label/input making
export default (props) => {
  const [val, setVal] = useState(props.value);

  const cleanName = (str) => `entry_ ${str.replaceAll(' ', '_').toLowerCase()}`;
  const updateVal = (e) => {
    setVal(e.target.value);
    props.update(e.target.value);
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
