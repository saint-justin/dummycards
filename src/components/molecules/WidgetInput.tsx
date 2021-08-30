import * as React from 'react';
import { useEffect } from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import { DrawableProperty, WInput } from '../../utils/types';
import { cleanString } from '../../utils/Helpers';

type WInputProps = {
  name: string,
  drawableProp: DrawableProperty,
  type?: string,
  action?: ((widgetInput: WInput) => void),
  defaultValue?: string | number,
};

// eslint-disable-next-line max-len
const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, drawableProp, type, defaultValue, action,
  } = props;

  // Input Change Handler
  const inputChange = (newColor: string) => {
    if (!action) throw new Error('Error: Tried to call action in WidgetInput before action was set');
    action({ value: newColor, property: drawableProp });
  };

  // Push one update as soon as set up
  useEffect(() => {
    const initialValue = defaultValue || 'unfilled value';
    inputChange(initialValue.toString());
  }, []);

  return (
    <>
      <Label name={name} labelFor={`input_${cleanString(name)}`} />
      <Input
        name={name}
        action={inputChange}
        defaultValue={defaultValue || 'unfilled value'}
        type={type || 'text'}
      />
    </>
  );
};

WidgetInput.defaultProps = {
  defaultValue: 'unfilled value',
  type: undefined,
  action: undefined,
};

export default WidgetInput;
