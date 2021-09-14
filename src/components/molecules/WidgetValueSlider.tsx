import React, { useState } from 'react';
import * as _ from 'lodash';

import Slider from '../atoms/Slider';
import Label from '../atoms/Label';
import { DrawableProperty, WInput } from '../../utils/types';

import './styles/WidgetValueSlider.scss';
import '../atoms/styles/Input.scss';

type WValueSlider = {
  name: string,
  min: number,
  max: number,
  defaultValue: number,
  defaultProp: DrawableProperty;
  action?: ((widgetInput: WInput) => void)
};

const WidgetValueSlider = (props: WValueSlider) => {
  const {
    name, min, max, defaultValue, defaultProp, action,
  } = props;
  const [divId] = useState(_.uniqueId(name));
  const [value, setValue] = useState<number>(defaultValue);

  const valueChanged = (newValue: string | number): void => {
    console.log(`Update to value of ${name}: ${newValue}`);
    const num = typeof newValue === 'string' ? parseInt(newValue, 10) : newValue;
    if (!action) throw new Error(`Action not implemented on WidgetValueSlider (${name})`);
    action({ property: defaultProp, value: num.toString() });
    setValue(num);
  };

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    valueChanged(target.value || 0);
  };

  return (
    <>
      <Label name={name} labelFor={divId} />
      <div id={divId} className="default-valueslider">
        <Slider
          name={_.uniqueId(name)}
          min={min}
          max={max}
          defaultValue={value}
          action={valueChanged}
        />
        <input
          className="input-slider-pair"
          value={value}
          onChange={inputChange}
          type="number"
        />
      </div>
    </>
  );
};

WidgetValueSlider.defaultProps = {
  action: () => {},
};

export default WidgetValueSlider;
