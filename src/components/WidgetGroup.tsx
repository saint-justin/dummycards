import * as React from 'react';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { Drawable, WInput } from '../types';
import './WidgetGroup.scss'

type WidgetGroup = {
  name: string,
  widgetInputSet: JSX.Element[] | undefined,
  drawable: boolean,
  drawableChanged: (d: Drawable, id: string) => void,
};

export default (props: WidgetGroup): JSX.Element => {
  // Generate an id and base drawable object
  const [id] = useState<string>(`name_${Date.now()}`);
  const [drawable, setDrawable] = useState<Drawable>({
    text: '',
    fillStyle: '#000000',
    textAlign: 'left',
    position: {
      left: 'center',
      right: 'none',
      top: 'center',
      bottom: 'none',
    },
  });

  // Push updates to drawables into app.tsx
  useEffect(() => {
    props.drawableChanged(drawable, id);
  }, [drawable])

  // Defines what the widget should do any time we're trying to update internal drawable info
  const widgetActionDefault = (updateInfo: WInput): void => {
    console.log('Widget action logged...');
    console.log(updateInfo);

    const drawableClone = _.cloneDeep(drawable);
    switch(updateInfo.property) {
      case 'text' || 'fillStyle' || 'font':
        drawableClone[updateInfo.property] = updateInfo.value;
        setDrawable(drawableClone);
        return;
        
      case 'textAlign':
        console.log('updateInfo');
        console.log(updateInfo);
        if (updateInfo.value !== 'left' && updateInfo.value !== 'right' && updateInfo.value !== 'center') {
          console.error(`Error: Tried setting drawable property 'textAlign' to illegal value (${updateInfo.value})`);
          return;
        } 
        drawableClone[updateInfo.property] = updateInfo.value;
        setDrawable(drawableClone);
        return;

      case 'top'|| 'bottom' || 'left' || 'right':
        if (Number.isInteger(parseInt(updateInfo.value))) {
          drawableClone.position[updateInfo.property] = parseInt(updateInfo.value);
        } else if (updateInfo.value === 'center' || updateInfo.value === 'none') {
          drawableClone.position[updateInfo.property] = updateInfo.value;
        } else {
          console.error(`Error: Tried setting drawable property '${updateInfo.property}' to illegal value (${updateInfo.value})`);
          return;
        }
        setDrawable(drawableClone);
        return;
    }
  }

  // Checks if a given element has an 'action' prop and appends one if it doesn't
  const appendActions = (arr: JSX.Element[] | undefined): JSX.Element[] => {
    if (!arr) return [];
    
    return arr.map((element: JSX.Element) => {
      // Element has action, don't touch it
      if (element.props.action) return element;

      // Element doesn't have an action, append widgetActionDefault
      const elementClone = _.cloneDeep(element);
      elementClone.props.action = widgetActionDefault;
      return elementClone;
    })
  }

  // One-time initialization, setting up the basic values for the below inputs
  useEffect(() => {
    if (props.widgetInputSet) {
      props.widgetInputSet.forEach((element:JSX.Element) => {
        if (element.props.name === 'Horizontal Alignment') drawable.position.left = parseInt(element.props.value) || element.props.value;
        if (element.props.name === 'Vertical Alignment') drawable.position.top = parseInt(element.props.value) || element.props.value;
        if (element.props.name === 'Color') drawable.fillStyle = element.props.value;
        if (element.props.name === 'Placeholder Testing Text') drawable.text = element.props.value || 'No text found';
      })
    }
  }, []);

  // The actual JSX to be returned
  return (
    <div className='widget-group'>
      <h3>{ props.name }</h3>
      { appendActions(props.widgetInputSet) }
    </div>
  )
}