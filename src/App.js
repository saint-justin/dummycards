import React, { useState, useEffect } from 'react';
// import Entry from './Components/Entry';
import Group from './Components/Group';
import Canvas from './Components/Canvas';
import './App.scss';

// External tracker for internal dimensions
const dimensionsInternal = [1125, 825];

const app = () => {
  const [canvasDimensions, setCanvasDimensions] = useState([1125, 825]);
  const [widgets, setWidgets] = useState(null);
  const [drawnItems, setDrawnItems] = useState([]);

  // Functions to adjust canvas sizing
  // eslint-disable-next-line max-len
  const updateCanvasDimensions = () => { setCanvasDimensions([dimensionsInternal[0], dimensionsInternal[1]]); };
  const updateCanvasWidth = (width) => { dimensionsInternal[0] = width; };
  const updateCanvasHeight = (height) => { dimensionsInternal[1] = height; };

  // Helper functions for generating widgets
  const NOT_IMPLEMENTED = (e) => { console.error(`Error: Function not yet implemented for ${e.target.value}`); };
  const generateUpload = (name, type, update) => ({ name, type, update });
  const generateTyped = (name, type, placeholder, update, value = '') => ({
    name, type, placeholder, update, value, custom: true,
  });
  const generateAction = (name, action) => ({ name, action });
  const generateGroup = (name, itemArr, actionObj, update) => {
    const output = {};
    output.groupName = name;
    output.items = itemArr;
    output.action = actionObj;
    return <Group data={output} key={name} update={update}/>;
  };

  // Compose the left-side interaction widgets
  useEffect(() => {
    const generatedWidgets = [];

    const sizingItems = [];
    sizingItems.push(generateTyped('Card Height', 'number', '1125', updateCanvasHeight));
    sizingItems.push(generateTyped('Card Width', 'number', '825', updateCanvasWidth));
    const sizingAction = generateAction('Recalculate Dimensions', updateCanvasDimensions);
    generatedWidgets.push(generateGroup('Card Sizing', sizingItems, sizingAction));

    /*
    const demoCardComponent1 = {
      text: 'Card Title',
      textAlign: 'center',
      fillStyle: '#000000',
      font: '36px serif',
      position: {
        top: 10,
        left: 'center',
      },
    };
  */

    const newEntryItems = [];
    newEntryItems.push(generateTyped('Name', 'text', 'The name in your CSV to associate', NOT_IMPLEMENTED));
    newEntryItems.push(generateTyped('Test Value', 'text', 'e.g. 350hp or 1000 or banana', NOT_IMPLEMENTED));
    newEntryItems.push(generateTyped('Left', 'number', '0', NOT_IMPLEMENTED));
    newEntryItems.push(generateTyped('Top', 'number', '0', NOT_IMPLEMENTED));
    generatedWidgets.push(generateGroup('New Entry', newEntryItems));

    const exportItems = [];
    exportItems.push(generateUpload('Upload CSV', 'file', NOT_IMPLEMENTED));
    const exportAction = generateAction('Export File', NOT_IMPLEMENTED);
    generatedWidgets.push(generateGroup('Export', exportItems, exportAction));

    setWidgets(generatedWidgets);
  }, []);

  return (
  <>
    <div id='left'>
      { widgets }
    </div>
    <div id='right'>
      <Canvas dimensions={canvasDimensions} drawnComponents={drawnItems}/>
    </div>
  </>
  );
};

export default app;
