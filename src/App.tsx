import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/Canvas';
// import ApolloTestQuery from './ApolloTest';
import './App.scss';

export default (): JSX.Element => {

  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);

  // Initialization
  useEffect(() => {
    // Setting up all widgets
    const widgetInputs = [];
    widgetInputs.push(<WidgetInput name='test 1' placeholder='placeholder 1' key='key1'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 2' placeholder='placeholder 2' key='key2'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 3' placeholder='placeholder 3' key='key3'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test button' key='key4' button={true}></WidgetInput>);
    setWidgets(widgetInputs);

    // TODO: Setting up canvas default
    
  }, [])

  return (
  <>
    <section id='widget-toolbar'>
      {/* <WidgetInput name='TestInput' placeholder='TestInfo'/>*/}
      <WidgetGroup widgetInputSet={widgets} name='Widget Group'/>
    </section>
    <div id='display'>
      <Canvas />
    </div>
  </>
)};