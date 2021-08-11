import React, { useState } from 'react';
import pencil from 'url:../Content/pencil.svg';
// import { ReactComponent as pencil } from 'url:../Content/pencil.svg';
import Entry from './Entry';
// import PencilSVG from '../Content/pencil.svg';
import './Group.scss';

// Wrapper to group together a set of entries
const Group = (props) => {
  // Name tracker
  const [img, setImg] = useState(<img src={pencil}/>);

  // Generates the data for a given group by adding title, entries, and optional action btn
  const generateGroup = (data) => {
    const items = [];
    items.push(<h3>{props.data.groupName}{img}</h3>);
    for (let i = 0; i < data.items.length; i++) {
      items.push(<Entry {...data.items[i]} update={props.update} />);
    }
    if (data.action) {
      items.push(<button {...data.action}>{data.action.name}</button>);
    }
    return (
      <div className='entry-group'>{items}</div>
    );
  };

  // Punch out the generated output
  return <>{generateGroup(props.data)}</>;
};

export default Group;
