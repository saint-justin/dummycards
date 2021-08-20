import * as React from 'react';
import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import { Drawable, Size, DrawableCallback } from './types';

import WidgetInput from './components/WidgetInput';
import WidgetDropdown from './components/WidgetDropdown';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/Canvas';

import './App.scss';

// Stored externally to prevent resets on refreshes
// Dimensions of the card
const cardDimensions: Size = {
  height: 1125,
  width: 825
};

// List of all the drawable getters based on their keys
const drawableGetters = new Map<string, (()=>Drawable)>();

// Redraws components in the canvas
let redraw = () => { console.error('Error: Redraw not yet set up!'); };

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
  };
  const updateHeight = (s: string | void): void => updateOneDimension(s, 'height');
  const updateWidth = (s: string | void): void => updateOneDimension(s, 'width');
  const updateCardDimensions = () => redraw();
  const UNIMPLIMENTED = () => { console.error(`ERROR: This component's action has not yet been implemented`)};

  // Gets a redraw function from child canvas component to manually call when updating dimensions
  const getRedrawFromChild = (childRedraw: (height: number, width: number) => void) => {
    redraw = () => childRedraw(cardDimensions.height, cardDimensions.width);
  }

  // Stores a drawable getter function and a key as passed from child into drawableGetters
  const createDrawableGetter = (key: string, callback: DrawableCallback):void => {
    drawableGetters.set(key, callback);
  }

  // Updater function fo update drawable objects
  const updateAllDrawables = (): void => {
    // Return early if there's nothing to show
    // console.log(Array.from(drawableGetters.entries()).length)
    // return;
    if(Array.from(drawableGetters.entries()).length === 0) return;

    // Grabs all the drawable getters from their objects
    const updated: Drawable[] = [];
    const keys = Array.from(drawableGetters.keys());

    const keysLen = keys.length;
    for(let i=0; i<keysLen; i++) {
      const getDrawable = drawableGetters.get(keys[i]);
      if (!getDrawable) {
        console.error('Drawable getter undefined for element with key ' + keys[i]);
        continue;
      }
      updated.push(getDrawable());
    }

    console.log('Updated drawable array generated.');
    console.log(updated);

    setDrawables(updated); // REIMPLEMENT WHEN FINISHED
  }


  // Update drawables any time the widgets get updated
  useEffect(() => {
    if(!drawableGetters.keys) return;
    updateAllDrawables();
  }, [widgets, drawableGetters])

  // Run-once initialization
  useEffect(() => {
    // Array to hold all widget groups
    const widgetGroups = []

    // Creating a first widget to house the Card's dimensions
    const dimensionInputs = [];
    dimensionInputs.push(<WidgetInput type='number' name='Height' value='1125' key='dimensions_height' action={updateHeight}></WidgetInput>);
    dimensionInputs.push(<WidgetInput type='number' name='Width' value='825' key='dimensions_width' action={updateWidth}></WidgetInput>);
    dimensionInputs.push(<WidgetInput type='button' name='Resize Card' key='dimensions_button' action={updateCardDimensions}></WidgetInput>);
    widgetGroups.push(
    <WidgetGroup 
      drawable={false} 
      name='Card Dimensions' 
      widgetInputSet={dimensionInputs}
      index={0}
      key={0}
      drawableGetter={createDrawableGetter}
      ></WidgetGroup>
    )

    // Creating a second widget to allow users to submit info to be displayed
    const testTextInputs = [];
    testTextInputs.push(<WidgetInput name='Placeholder Testing Text' value='placeholder_name' key='test_text' action={UNIMPLIMENTED}></WidgetInput>)
    testTextInputs.push(<WidgetDropdown name='Horizontal Alignment' value='10' key='test_dropdown_h' action={UNIMPLIMENTED} options={['Left (%)', 'Right (%)', 'Center']}></WidgetDropdown>)
    testTextInputs.push(<WidgetDropdown name='Vertical Alignment' value='10' key='test_dropdown_v' action={UNIMPLIMENTED} options={['Top (%)', 'Bottom (%)', 'Center']}></WidgetDropdown>)
    testTextInputs.push(<WidgetInput type='color' name='Color' value='#00FF00' key='test_color' action={UNIMPLIMENTED}></WidgetInput>)
    widgetGroups.push(
    <WidgetGroup 
      drawable={true} 
      name='Text Input' 
      widgetInputSet={testTextInputs}
      index={1}
      key={1}
      drawableGetter={createDrawableGetter}
      ></WidgetGroup>
    );

    // Set our collection of widgets into state
    setWidgets(widgetGroups);    
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