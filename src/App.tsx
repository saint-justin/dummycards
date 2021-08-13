import * as React from 'react';
import { useState, useEffect } from 'react';
import WidgetInput from './components/WidgetInput';
import WidgetGroup from './components/WidgetGroup';
import './App.scss';

export default () => {

  const [widgets, setWidgets] = useState<React.ReactElement | undefined>(undefined);
  /*
    name: string,
    placeholder: string,
    type: string,
    value: string | number,
   */
  useEffect(() => {
    const widgetInputs = [];
    widgetInputs.push(<WidgetInput name='test 1' placeholder='placeholder 1' key='key1'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 2' placeholder='placeholder 2' key='key2'></WidgetInput>);
    widgetInputs.push(<WidgetInput name='test 3' placeholder='placeholder 3' key='key3'></WidgetInput>);
    setWidgets(<div className='widget-set'>{widgetInputs}</div>);
  }, [])

  return (
  <>
    <section id='widget-toolbar'>
      {/* <WidgetInput name='TestInput' placeholder='TestInfo'/>*/}
      <WidgetGroup widgetInputSet={widgets} name='Widget Group'/>
    </section>
    <div id='display'></div>
  </>
)};