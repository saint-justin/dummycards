/* eslint-disable max-len */
import * as React from 'react';
import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import { Drawable, Size, WInput } from './utils/types';

import WidgetInput from './components/molecules/WidgetInput';
import WidgetDropdown from './components/molecules/WidgetDropdown';
import WidgetGroup from './components/organisms/WidgetGroup';
import Canvas from './components/atoms/Canvas';

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
    console.log(`Updating drawable id ${id}...`);
    console.log(d);
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
    dimensionInputs.push(<WidgetInput type="number" name="Height" defaultValue="1125" key="dimensions_height" action={updateHeight} drawableProp="text" />);
    dimensionInputs.push(<WidgetInput type="number" name="Width" defaultValue="825" key="dimensions_width" action={updateWidth} drawableProp="text" />);
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
    testTextInputs.push(<WidgetInput name="Placeholder Text" defaultValue="coolest clam in the west" key="test_text" drawableProp="text" />);
    testTextInputs.push(<WidgetDropdown name="Text Align" key="test_dropdownTextAlign" options={['left', 'center', 'right']} drawableProp="textAlign" defaultOption="right" />);
    // testTextInputs.push(<WidgetDropdown name="Horizontal Alignment" key="test_dropdown_ha" options={['left', 'center', 'right']} initialProperty="start" alignmentType="horizontal" />);
    // testTextInputs.push(<WidgetDropdown name="Vertical Alignment" key="test_dropdown_va" options={['top', 'center', 'bottom']} initialProperty="start" alignmentType="vertical" />);
    testTextInputs.push(<WidgetInput type="color" name="Color" defaultValue="#00ff00" key="test_color" drawableProp="fillStyle" />);
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
