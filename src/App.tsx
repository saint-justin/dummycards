import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/Canvas';
import { Drawable, Size } from './types'
// import ApolloTestQuery from './ApolloTest';
import './App.scss';

const cardDimensions: Size = {
  height: 1125,
  width: 825
};

export default (): JSX.Element => {

  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);
  const [drawables, setDrawables] = useState<Drawable[] | undefined>(undefined);
  const [cardSize, setCardSize] = useState(cardDimensions);

  const updateHeight = (h: number): void => { cardDimensions.height = h; console.log('Height changed') };
  const updateWidth = (w: number): void => { cardDimensions.width = w; console.log('Width changed'); };
  const updateDimensions = (): void => { setCardSize(cardDimensions); console.log('Button pressed'); };

  // Initialization
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
        right: 'none'
      }
    }

    setDrawables([demo_01]);
  }, [])

  return (
  <>
    <section id='widget-toolbar'>
      {/* <WidgetInput name='TestInput' placeholder='TestInfo'/>*/}
      <WidgetGroup widgetInputSet={widgets} name='Widget Group'/>
    </section>
    <div id='display'>
      <Canvas drawables={drawables} size={cardSize}/>
    </div>
  </>
)};