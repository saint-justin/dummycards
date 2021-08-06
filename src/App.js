import React, { useState } from 'react';
import Entry from './Components/Entry';
import Group from './Components/Group';
import Canvas from './Components/Canvas';
import './App.scss';

// External tracker for internal dimensions
const dimensionsInternal = [1125, 825];

const app = () => {
  const [canvasDimensions, setCanvasDimensions] = useState([1125, 825]);

  const debug = () => { console.log(`New Dimensions: (${dimensionsInternal[0]}, ${dimensionsInternal[1]})`); };
  const updateCanvasWidth = (width) => { dimensionsInternal[0] = width; debug(); };
  const updateCanvasHeight = (height) => { dimensionsInternal[1] = height; debug(); };

  const generateJSON = () => {
    // console.log('Button pressed!');
    console.log(`Internal Dimensions: (${dimensionsInternal[0]}, ${dimensionsInternal[1]})`);
    setCanvasDimensions([dimensionsInternal[0], dimensionsInternal[1]]);
  };

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
      onClick: generateJSON,
    },
  };

  return (
  <>
    <div id='left'>
      {/* <Entry name='Card Width' placeholder='825' update={updateCanvasWidth}/>
      <Entry name='Card Height' placeholder='1125' update={updateCanvasHeight} /> */}
      {/* <Group groupName='Card Sizing'
        nameOne='Card Width' placeholderOne='825' updateOne={updateCanvasWidth}
        nameTwo='Card Height' placeholderTwo='1125' updateTwo={updateCanvasHeight} /> */}
      <Group data={testGroup}/>
      <Entry name='Upload CSV' type='file' />
      {/* <button onClick={generateJSON}>Re-calculate</button> */}
    </div>
    <div id='right'>
      <Canvas dimensions={canvasDimensions} />
    </div>
  </>
  );
};

export default app;
