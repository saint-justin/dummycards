import * as React from 'react';
import { useEffect } from 'react';
import { Drawable, DrawableCallback } from '../types';
import './WidgetGroup.scss'

type WidgetGroup = {
  name: string,
  widgetInputSet: JSX.Element[] | undefined,
  drawable: boolean,
  index: number,
  drawableGetter: (key: string, callback: DrawableCallback) => void;
}

export default (props: WidgetGroup): JSX.Element => {
  const drawable: Drawable = {
    text: '',
    fillStyle: '#000000',
    textAlign: 'left',
    position: {
      left: 'center',
      right: 'none',
      top: 'center',
      bottom: 'none',
    }
  }

  const internalDrawableGetter = (): Drawable => drawable;

  // One-time initialization
  useEffect(() => {
    if (props.widgetInputSet) {
      props.widgetInputSet.forEach((input:JSX.Element) => {
        if (input.props.name === 'Horizontal Alignment') drawable.position.left = parseInt(input.props.value) || input.props.value;
        if (input.props.name === 'Vertical Alignment') drawable.position.top = parseInt(input.props.value) || input.props.value;
        if (input.props.name === 'Color') drawable.fillStyle = input.props.value;
        if (input.props.name === 'Placeholder Testing Text') drawable.text = input.props.value || 'No text found';
      })
    }

    // Pass an internal drawable getter up into the parent for parent reference
    if (props.drawable) props.drawableGetter(props.index.toString(), internalDrawableGetter);
  }, []);

  return (
    <div className='widget-group'>
      <h3>{props.name}</h3>
      { props.widgetInputSet }
    </div>
  )
}