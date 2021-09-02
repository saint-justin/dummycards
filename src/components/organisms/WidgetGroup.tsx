/* eslint-disable no-case-declarations */
import * as React from 'react';
import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import {
  TextAlignOpt, Drawable, WInput, RelativePosition,
} from 'utils/types';
import './WidgetGroup.scss';

type WidgetGroup = {
  // eslint-disable-next-line react/no-unused-prop-types
  drawable: boolean, // Used in app.tsx
  drawableChanged: (d: Drawable, id: string) => void,
  name: string,
  widgetInputSet: JSX.Element[] | undefined,
};

export default ({ name, widgetInputSet, drawableChanged }: WidgetGroup): JSX.Element => {
  // Generate an id and base drawable object
  const [id] = useState<string>(`${name}_${Date.now()}`);
  const [drawableText, setDrawableText] = useState<string>('default_name');
  const [drawableTextAlign, setDrawableTextAlign] = useState<TextAlignOpt>('left');
  const [drawableFillStyle, setDrawableFillStyle] = useState<string>(name);
  const [drawablePosition, setDrawablePosition] = useState<RelativePosition>({
    left: 10,
    right: 'none',
    top: 10,
    bottom: 'none',
  });

  // Defines what the widget should do any time we're trying to update internal drawable info
  const adjustDrawableFromWidget = (updateInfo: WInput): void => {
    console.log('Widget action logged...');
    console.log(updateInfo);
    const { value, property } = updateInfo;

    switch (property) {
      case 'text':
        setDrawableText(value);
        return;
      case 'fillStyle':
        setDrawableFillStyle(value);
        return;
      case 'textAlign':
        if (!['left', 'center', 'right'].includes(value)) {
          throw new Error(`Error: Text align set as illegal value in widgetGroup (${name})`);
        }
        const opt = value as TextAlignOpt;
        setDrawableTextAlign(opt);
        return;

      case 'top':
      case 'bottom':
      case 'left':
      case 'right':
        const posClone = _.cloneDeep(drawablePosition);
        if (!Number.isNaN(value)) {
          // TODO: Check if we need to clear the alt value to this one
          posClone[property] = parseInt(value, 10);
        } else if (value === 'none') {
          posClone[property] = value;
        } else {
          throw new Error(`Error: Illegal position value passed as a position to widgetGroup (${name})`);
        }
        setDrawablePosition(posClone);
        return;

      default:
        throw new Error(`Error: Illegal drawable property given to widgetGroup (${name}`);
    }
  };

  // Checks if a given element has an 'action' prop and appends one if it doesn't
  const appendActions = (arr: JSX.Element[] | undefined): JSX.Element[] => {
    if (!arr) return [];

    return arr.map((element: JSX.Element) => {
      // Element has action, don't touch it
      if (element.props.action) return element;

      // Element doesn't have an action, append adjustDrawableFromWidget
      const elementClone = _.cloneDeep(element);
      elementClone.props.action = adjustDrawableFromWidget;
      return elementClone;
    });
  };

  // Update the app w/ the set-up version of the drawable
  useEffect(() => {
    const newDrawable: Drawable = {
      text: drawableText,
      textAlign: drawableTextAlign,
      fillStyle: drawableFillStyle,
      position: drawablePosition,
    };

    drawableChanged(newDrawable, id);
  }, [drawableText, drawableTextAlign, drawableFillStyle, drawablePosition]);

  // The actual JSX to be returned
  return (
    <div className="widget-group">
      <h3>{ name }</h3>
      { appendActions(widgetInputSet) }
    </div>
  );
};
