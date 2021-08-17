import * as React from 'react';
import './WidgetGroup.scss'

type WidgetGroup = {
  name: string,
  widgetInputSet: JSX.Element[] | undefined,
}

export default (props: WidgetGroup): JSX.Element => {
  return (
    <div className='widget-group'>
      <h3>{props.name}</h3>
      { props.widgetInputSet }
    </div>
  )
}