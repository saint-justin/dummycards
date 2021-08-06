import React, { useState } from 'react';
import Entry from './Components/Entry';
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

  return (
  <>
    <div id='left'>
      <Entry name='Card Width' placeholder='825' update={updateCanvasWidth}/>
      <Entry name='Card Height' placeholder='1125' update={updateCanvasHeight} />
      <Entry name='Upload CSV' type='file' />
      <button onClick={generateJSON}>Re-calculate</button>
    </div>
    <div id='right'>
      <Canvas dimensions={canvasDimensions} />
    </div>
  </>
  );
};

export default app;
