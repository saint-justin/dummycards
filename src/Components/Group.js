import React from 'react';
import Entry from './Entry';
import './Group.scss';

// Wrapper to group together a set of entries
const Group = (props) => {
  // Generates the data for a given group by adding title, entries, and optional action btn
  const generateGroup = (data) => {
    const items = [];
    items.push(<h3>{data.groupName}</h3>);
    for (let i = 0; i < data.items.length; i++) {
      items.push(<Entry {...data.items[i]} />);
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
