import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/Canvas';
import { Drawable, Size } from './types'
// import ApolloTestQuery from './ApolloTest';
import './App.scss';

// Stored externally to prevent force-updates on child components without resetting
const cardDimensions: Size = {
  height: 1125,
  width: 825
};

let redraw = () => { console.log('Error: Redraw not yet set up!'); };

export default (): JSX.Element => {
  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);
  const [drawables, setDrawables] = useState<Drawable[] | undefined>(undefined);
  const [cardSize, setCardSize] = useState(cardDimensions);

  // Updater function to update card dimensions one at a time
  const updateOneDimension = (s: string | void, which: 'height' | 'width'): void => {
    if(!s) {
      console.error('Value passed to update card dimensions is not a string');
      return;
    }
    cardDimensions[which] = parseInt(s); 
  }
  const updateHeight = (s: string | void): void => updateOneDimension(s, 'height');
  const updateWidth = (s: string | void): void => updateOneDimension(s, 'width');

  // Sets new dimension sizes and forces an update
  const updateDimensions = (): void => { 
    setCardSize(cardDimensions); 
    redraw();
  };  

  // Gets a redraw function from child canvas component to manually call when updating dimensions
  const getRedrawFromChild = (childRedraw: (height: number, width: number) => void) => {
    redraw = () => childRedraw(cardDimensions.height, cardDimensions.width);
  }

  // Run-once initialization
  useEffect(() => {
    // Setting up all widgets
    const widgetInputs = [];
    widgetInputs.push(<WidgetInput name='Name' placeholder='Dimensions' key='key1'></WidgetInput>);
    widgetInputs.push(<WidgetInput type='number' name='Height' value='1125' key='key2' action={updateHeight}></WidgetInput>);
    widgetInputs.push(<WidgetInput type='number' name='Width' value='825' key='key3' action={updateWidth}></WidgetInput>);
    widgetInputs.push(<WidgetInput type='button' name='test button' key='key4' action={updateDimensions}></WidgetInput>);
    setWidgets(widgetInputs);

    // Setting up canvas default
    const demo_01: Drawable = {
      text: 'Example Centered Drawable',
      textAlign: 'center',
      fillStyle: '#000000',
      font: '36px serif',
      position: {
        top: 'center',
        bottom: 'none',
        left: 'center',
        right: 'none',
      },
    }

    setDrawables([demo_01]);
  }, [])

  return (
  <>
    <section id='widget-toolbar'>
      <WidgetGroup widgetInputSet={widgets} name='Widget Group'/>
    </section>
    <div id='display'>
      <Canvas drawables={drawables} size={cardSize} setRedrawInParent={getRedrawFromChild}/>
    </div>
  </>
)};