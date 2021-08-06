import React, { useState, useEffect } from 'react';
import Entry from './Components/Entry';
import Group from './Components/Group';
import Canvas from './Components/Canvas';
import './App.scss';

// External tracker for internal dimensions
const dimensionsInternal = [1125, 825];

const app = () => {
  const [canvasDimensions, setCanvasDimensions] = useState([1125, 825]);
  const [widgets, setWidgets] = useState(null);

  const updateCanvasWidth = (width) => { dimensionsInternal[0] = width; };
  const updateCanvasHeight = (height) => { dimensionsInternal[1] = height; };
  const updateCanvasDimensions = () => {
    setCanvasDimensions([dimensionsInternal[0], dimensionsInternal[1]]);
  };

  const generateGroup = (name, itemArr, actionObj) => {
    const output = {};
    output.groupName = name;
    output.items = itemArr;
    output.action = actionObj;
    return <Group data={output} key={name}/>;
  };

  const generateItem = (name, placeholder, update) => ({
    name,
    placeholder,
    update,
  });

  const generateAction = (name, action) => ({
    name,
    action,
  });

  // Initialize the left-side widgets
  useEffect(() => {
    const generatedWidgets = [];
    const items = [];
    items.push(generateItem('Card Height', '1125', updateCanvasHeight));
    items.push(generateItem('Card Width', '825', updateCanvasWidth));
    const action = generateAction('Recalculate Dimensions', updateCanvasDimensions);
    generatedWidgets.push(generateGroup('Card Sizing', items, action));

    setWidgets(generatedWidgets);
  }, []);

  const testGroup = {
    groupName: 'Card Sizing',
    items: [
      {
        name: 'Card Width',
        placeholder: '825',
        update: updateCanvasWidth,
      },
      {
        name: 'Card Height',
        placeholder: '1125',
        update: updateCanvasHeight,
      },
    ],
    action: {
      name: 'Recalculate Card',
      onClick: updateCanvasDimensions,
    },
  };

  return (
  <>
    <div id='left'>
      {/* <Group data={testGroup}/> */}
      { [widgets] }
      <Entry name='Upload CSV' type='file' />
    </div>
    <div id='right'>
      <Canvas dimensions={canvasDimensions} />
    </div>
  </>
  );
};

export default app;
