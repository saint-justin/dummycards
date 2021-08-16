import * as React from 'react';
import './WidgetGroup.scss'

type WidgetGroup = {
  name: string,
  widgetInputSet: React.ReactElement | undefined,
  // action?: (e: Event) // Revisit!
}

export default (props: WidgetGroup): JSX.Element => {
  return (
    <div className='widget-group'>
      <h3>{props.name}</h3>
      { props.widgetInputSet }
    </div>
  )
}