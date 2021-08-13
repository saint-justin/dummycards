import * as React from 'react';

type WidgetGroup = {
  name: string,
  widgetInputSet: ReactElement | undefined,
  // action?: (e: Event) // Revisit!
}

export default (props:WidgetGroup) => {
  return (
    <div className='widget-group'>
      <h3>{props.name}</h3>
      { props.widgetInputSet }
    </div>
  )
}