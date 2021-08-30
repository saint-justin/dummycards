import * as React from 'react';
import Label from '../atoms/Label';
import Color from '../atoms/Color';
import { WInput } from '../../utils/types';
import helpers from '../../utils/Helpers';

type WColorProps = {
  name: string,
  action: ((widgetInput: WInput) => void),
  defaultValue?: string | number,
};

const WidgetColor = ({ name, defaultValue, action }: WColorProps): React.ReactElement => {
  // Input Change Handler
  const inputChange = (newColor: string) => {
    if (!action) throw new Error('Error: Tried to call action in colorwidget before action was set');
    action({ value: newColor, property: 'fillStyle' });
  };

  return (
    <>
      <Label name={name} labelFor={`color_${helpers.cleanString(name)}`} />
      <Color name={name} action={inputChange} defaultValue={defaultValue || '#000000'} />
    </>
  );
};

WidgetColor.defaultProps = {
  defaultValue: '#000000',
};

export default WidgetColor;
