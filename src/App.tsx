/* eslint-disable max-len */
import * as React from 'react';
import * as _ from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import { Drawable, Size, WInput } from './utils/types';

import Button from './components/atoms/Button';
import WidgetInput from './components/molecules/WidgetInput';
import WidgetDropdown from './components/molecules/WidgetDropdown';
import WidgetPositional from './components/molecules/WidgetPositional';
import WidgetGroup from './components/organisms/WidgetGroup';
import Canvas from './components/atoms/Canvas';

import './App.scss';

export default (): JSX.Element => {
  const [cardDimensions, setCardDimensions] = useState<Size>({ height: 1125, width: 825 });
  const [widgets, setWidgets] = useState<JSX.Element[]>([]);
  const [drawables, setDrawables] = useState<Map<string, Drawable>>(new Map<string, Drawable>());
  const [addMoreButton, setAddMoreButton] = useState<JSX.Element>();

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
  const updateDrawableFromWidgetGroup = useCallback(async (d: Drawable, id: string) => {
    setDrawables((currentDrawables: Map<string, Drawable>) => {
      const drawablesClone = _.cloneDeep(currentDrawables);
      drawablesClone.set(id, d);
      return drawablesClone;
    });
  }, []);

  // Function to extract the drawable objects from drawables dict
  const extractDrawables = (dict: Map<string, Drawable>): Drawable[] => {
    if (!dict) return [];
    const draws: Drawable[] = [];
    dict.forEach((d: Drawable) => draws.push(d));
    return draws;
  };

  // Creating a second widget to allow users to submit info to be displayed
  const generateNewInputWidget = (key: number, name: string): JSX.Element => {
    const generatedInputTypes: JSX.Element[] = [];
    generatedInputTypes.push(<WidgetInput
      name="Placeholder Text"
      defaultValue="coolest clam in the west"
      key="test_text"
      drawableProp="text"
    />);
    generatedInputTypes.push(<WidgetDropdown
      name="Text Align"
      key="test_dropdownTextAlign"
      options={['left', 'center', 'right']}
      drawableProp="textAlign"
      defaultOption="left"
    />);

    generatedInputTypes.push(<WidgetPositional
      name="Horizontal Alignment"
      key="test_dropdown_ha"
      defaultValue="10"
      defaultOption="left"
      positionalType="horizontal"
    />);

    generatedInputTypes.push(<WidgetPositional
      name="Vertical Alignment"
      key="test_dropdown_va"
      defaultValue="10"
      defaultOption="left"
      positionalType="vertical"
    />);

    generatedInputTypes.push(<WidgetInput
      type="color"
      name="Color"
      defaultValue="#00ff00"
      key="test_color"
      drawableProp="fillStyle"
    />);

    return (
      <WidgetGroup
        drawable
        name={name}
        widgetInputSet={generatedInputTypes}
        key={key}
        drawableChanged={updateDrawableFromWidgetGroup}
      />
    );
  };

  // Fxn to hook into addMoreWidgets button
  const addMoreOnClick = useCallback(async () => {
    setWidgets((currentWidgets: JSX.Element[]) => {
      const id = currentWidgets?.length;
      const newWidget = generateNewInputWidget(id || -1, 'Extra Input');
      const newArr = _.cloneDeep(currentWidgets);
      newArr.push(newWidget);
      return newArr;
    });
  }, []);

  // Run-once initialization
  useEffect(() => {
    const widgetGroups = [];

    // Creating a first widget to house the Card's dimensions
    const dimensionInputs: JSX.Element[] = [];
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

    widgetGroups.push(generateNewInputWidget(1, 'Test Group'));
    widgetGroups.push(generateNewInputWidget(2, 'Test Group2'));
    setAddMoreButton(<Button name="Add Another Widgets" action={addMoreOnClick} />);

    // Set our collection of widgets into state
    setWidgets(widgetGroups);
  }, []);

  return (
    <>
      <section id="widget-toolbar">
        {widgets}
        {addMoreButton}
      </section>
      <div id="display">
        <Canvas
          drawables={extractDrawables(drawables)}
          size={cardDimensions}
        />
      </div>
    </>
  );
};
