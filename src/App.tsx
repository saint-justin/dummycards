import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/Canvas';
import { Drawable, Size } from './types'
// import ApolloTestQuery from './ApolloTest';
import './App.scss';

// Stored externally to prevent force-updates on child components
// Dimensions of the card
const cardDimensions: Size = {
  height: 1125,
  width: 825
};
// Function to redraw components in the child
let redraw = () => { console.log('Error: Redraw not yet set up!'); };

export default (): JSX.Element => {
  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);
  const [drawables, setDrawables] = useState<Drawable[] | undefined>(undefined);

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
  const updateCardDimensions = () => redraw();


  // Gets a redraw function from child canvas component to manually call when updating dimensions
  const getRedrawFromChild = (childRedraw: (height: number, width: number) => void) => {
    redraw = () => childRedraw(cardDimensions.height, cardDimensions.width);
  }

  // Run-once initialization
  useEffect(() => {
    const widgetGroups = []
    // Setting up all widgets
    const dimensionInputs = [];
    dimensionInputs.push(<WidgetInput type='number' name='Height' value='1125' key='dimensions_height' action={updateHeight}></WidgetInput>);
    dimensionInputs.push(<WidgetInput type='number' name='Width' value='825' key='dimensions_width' action={updateWidth}></WidgetInput>);
    dimensionInputs.push(<WidgetInput type='button' name='Resize Card' key='dimensions_button' action={updateCardDimensions}></WidgetInput>);
    widgetGroups.push(<WidgetGroup name='Card Dimensions' widgetInputSet={dimensionInputs}></WidgetGroup>)

    const testTextInputs = [];
    testTextInputs.push(<WidgetInput name='Placeholder Text' value='placeholder' key='test_text' action={updateHeight}></WidgetInput>)
    testTextInputs.push(<WidgetInput type='text' name='Left' value='0' key='test_left' action={updateHeight}></WidgetInput>)
    testTextInputs.push(<WidgetInput type='text' name='Top' value='center' key='test_top' action={updateHeight}></WidgetInput>)
    widgetGroups.push(<WidgetGroup name='Text Input' widgetInputSet={testTextInputs}></WidgetGroup>)

    setWidgets(widgetGroups);

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
      {widgets}
    </section>
    <div id='display'>
      <Canvas drawables={drawables} size={cardDimensions} setRedrawInParent={getRedrawFromChild}/>
    </div>
  </>
)};