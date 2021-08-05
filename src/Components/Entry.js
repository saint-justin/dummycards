import React from "react";
import "./Entry.scss"

export default (props) => (
  <>
    <label>{props.name}</label>
    <input placeholder={props.placeholder} id={props.name} type={props.type}></input> 
  </>
);
