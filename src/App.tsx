import * as React from 'react';
import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import { Drawable, Size, WInput } from './types';

import WidgetInput from './components/widgets/WidgetInput';
import WidgetDropdown from './components/widgets/WidgetDropdown';
import WidgetGroup from './components/WidgetGroup';
import Canvas from './components/canvas/Canvas';

import './App.scss';

export default (): JSX.Element => {
  const [cardDimensions, setCardDimensions] = useState<Size>({ height: 1125, width: 825 });
  const [widgets, setWidgets] = useState<JSX.Element[] | undefined>(undefined);
  const [drawables, setDrawables] = useState<Map<string, Drawable>>(new Map<string, Drawable>());

  // Updater functions to update card dimensions one at a time
  const updateOneDimension = (s: string | void, which: 'height' | 'width'): void => {
    if (!s) {
      console.error('Value passed to update card dimensions is not a string');
      return;
    }
    const dimensionsClone = _.cloneDeep(cardDimensions);
    dimensionsClone[which] = parseInt(s, 10);
    setCardDimensions(dimensionsClone);
  };
  const updateHeight = (newDimension: WInput): void => updateOneDimension(newDimension.value, 'height');
  const updateWidth = (newDimension: WInput): void => updateOneDimension(newDimension.value, 'width');

  // Callback to a drawable in the map from a widget group based on its id
  const updateDrawableFromWidgetGroup = (d: Drawable, id: string) => {
    const clone = _.cloneDeep(drawables);
    clone.set(id, d);
    setDrawables(clone);
  };

  // Function to extract the drawable objects from drawables dict
  const extractDrawables = (dict: Map<string, Drawable>): Drawable[] => {
    if (!dict) return [];
    const draws: Drawable[] = [];
    dict.forEach((d: Drawable) => draws.push(d));
    return draws;
  };

  // Run-once initialization
  useEffect(() => {
    // Array to hold all widget groups
    const widgetGroups = [];

    // Creating a first widget to house the Card's dimensions
    const dimensionInputs = [];
    dimensionInputs.push(<WidgetInput type="number" name="Height" defaultValue="1125" key="dimensions_height" action={updateHeight} property="text" />);
    dimensionInputs.push(<WidgetInput type="number" name="Width" defaultValue="825" key="dimensions_width" action={updateWidth} property="text" />);
    widgetGroups.push(
      <WidgetGroup
        drawable={false}
        name="Card Dimensions"
        widgetInputSet={dimensionInputs}
        key={0}
        drawableChanged={updateDrawableFromWidgetGroup}
      />,
    );

    // Creating a second widget to allow users to submit info to be displayed
    const testTextInputs = [];
    testTextInputs.push(<WidgetInput name="Placeholder Testing Text" defaultValue="placeholder_name" key="test_text" property="text" />);
    testTextInputs.push(<WidgetDropdown name="Text Align" defaultValue="left" key="test_dropdown_text" options={['Left', 'Center', 'Right']} initialProperty="textAlign" />);
    testTextInputs.push(<WidgetDropdown name="Horizontal Alignment" defaultValue="10" key="test_dropdown_ha" options={['Left', 'Center', 'Right']} initialProperty="left" isInput />);
    testTextInputs.push(<WidgetDropdown name="Vertical Alignment" defaultValue="10" key="test_dropdown_va" options={['Top', 'Center', 'Bottom']} initialProperty="top" isInput />);
    testTextInputs.push(<WidgetInput type="color" name="Color" defaultValue="#000000" key="test_color" property="fillStyle" />);
    widgetGroups.push(
      <WidgetGroup
        drawable
        name="Text Input"
        widgetInputSet={testTextInputs}
        key={1}
        drawableChanged={updateDrawableFromWidgetGroup}
      />,
    );

    // Set our collection of widgets into state
    setWidgets(widgetGroups);
  }, []);

  return (
    <>
      <section id="widget-toolbar">
        {widgets}
      </section>
      <div id="display">
        <Canvas drawables={extractDrawables(drawables)} size={cardDimensions} />
      </div>
    </>
  );
};
