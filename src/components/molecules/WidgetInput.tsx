import * as React from 'react';
import Label from '../atoms/Label';
import Color from '../atoms/Color';
import { DrawableProperty, WInput } from '../../utils/types';
import helpers from '../../utils/Helpers';

type WInputProps = {
  name: string,
  drawableProp: DrawableProperty,
  action: ((widgetInput: WInput) => void),
  defaultValue?: string | number,
};

// eslint-disable-next-line max-len
const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, defaultValue, drawableProp, action,
  } = props;
  // Input Change Handler
  const inputChange = (newColor: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetInput before action was set');
    action({ value: newColor, property: drawableProp });
  };

  return (
    <>
      <Label name={name} labelFor={`input_${helpers.cleanString(name)}`} />
      <Color name={name} action={inputChange} defaultValue={defaultValue || '#000000'} />
    </>
  );
};

WidgetInput.defaultProps = {
  defaultValue: '#000000',
};

export default WidgetInput;
