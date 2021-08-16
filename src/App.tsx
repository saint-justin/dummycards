import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
// import ApolloTestQuery from './ApolloTest';
import './App.scss';

export default (): JSX.Element => {

  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);

  // Add placeholder test widgets
  useEffect(() => {
    const widgetInputs = [];
    widgetInputs.push(<WidgetInput name='test 1' placeholder='placeholder 1' key='key1'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 2' placeholder='placeholder 2' key='key2'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 3' placeholder='placeholder 3' key='key3'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test button' key='key4' button={true}></WidgetInput>);
    setWidgets(widgetInputs);
  }, [])

  // Using to test Apollo
  // useEffect(() => {
    // ApolloTestQuery();
  // }, [])

  return (
  <>
    <section id='widget-toolbar'>
      {/* <WidgetInput name='TestInput' placeholder='TestInfo'/>*/}
      <WidgetGroup widgetInputSet={widgets} name='Widget Group'/>
    </section>
    <div id='display'></div>
  </>
)};