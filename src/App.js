import React from 'react';
import Entry from './Components/Entry';
import CardDisplay from './Components/CardDisplay';
import './App.scss';

const app = () => {
  const canvasDimensions = [825, 1125];
  const updateCanvasWidth = (width) => { canvasDimensions[0] = width; };
  const updateCanvasHeight = (height) => { canvasDimensions[1] = height; };

  return (
  <>
    <div id='left'>
      <Entry name='Card Width' placeholder='825' update={updateCanvasWidth}/>
      <Entry name='Card Height' placeholder='1125' update={updateCanvasHeight} />
      <Entry name='Upload CSV' type='file' />
      <button>Re-calculate</button>
    </div>
    <div id='right'>
      <CardDisplay dimensions={canvasDimensions} />
    </div>
  </>
  );
};

export default app;
