import React, { useState } from 'react';
import * as _ from 'lodash';

import Slider from '../atoms/Slider';
import Label from '../atoms/Label';
import { WInput } from '../../utils/types';
import { cleanString, capitalizeFirst } from '../../utils/Helpers';

import './styles/WidgetValueSlider.scss';
import '../atoms/styles/Input.scss';
import '../atoms/styles/Dropdown.scss';

type WValueSlider = {
  name: string,
  min: number,
  max: number,
  opts: string[],
  defaultOpt: number,
  defaultValue: number,
  action?: ((widgetInput: WInput) => void)
};

const WidgetValueSlider = (props: WValueSlider) => {
  const {
    name, min, max, opts, defaultOpt, defaultValue, action,
  } = props;
  const [divId] = useState(_.uniqueId(cleanString(name)));
  const [value, setValue] = useState<number>(defaultValue);

  // eslint-disable-next-line max-len
  const generateOpts = (arr: string[]) => arr.map((str) => <option value={str} key={_.uniqueId(str)}>{capitalizeFirst(str)}</option>);
  const [optionsElements] = useState<JSX.Element[]>(generateOpts(opts));
  const [selectValue, setSelectValue] = useState<string>(opts[defaultOpt]);

  // Fxn to fire off our action and update value internally
  const valueChanged = (newValue: string | number): void => {
    const num = typeof newValue === 'string' ? parseInt(newValue, 10) : newValue;
    if (!action) throw new Error(`Action not implemented on WidgetValueSlider (${name})`);
    if (selectValue === 'center') {
      if (opts[0] === 'left' || opts[0] === 'top') {
        action({ property: opts[0], value: '50' });
      }
    } else if (selectValue !== 'top' && selectValue !== 'bottom' && selectValue !== 'left' && selectValue !== 'right') {
      throw new Error(`Invalid property passed from WidgetValueSlider '${selectValue}' (${name})`);
    } else {
      // console.log(`Select: ${selectValue}   Value: ${num}`);
      action({ property: selectValue, value: num.toString() });
      setValue(num);
    }
  };

  // Fxn to handle the generic input fields changing
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    valueChanged(target.value || 0);
  };

  // Fxn to handle the select changing
  const selectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if (!e) console.error('Error: Select event failed');
    const target = e.target as HTMLSelectElement;
    valueChanged(50);
    setSelectValue(target.value);
  };

  return (
    <>
      <Label name={name} labelFor={divId} />
      <div id={divId} className="default-valueslider">
        <select
          id={_.uniqueId(name)}
          value={selectValue}
          onChange={selectChange}
          className="generic-dropdown"
        >
          {optionsElements}
        </select>

        <Slider
          name={_.uniqueId(name)}
          min={min}
          max={max}
          defaultValue={value}
          action={valueChanged}
          disabled={selectValue === 'center'}
        />

        <input
          className="input-slider-pair"
          value={value}
          onChange={inputChange}
          type="number"
          disabled={selectValue === 'center'}
        />
      </div>
    </>
  );
};

WidgetValueSlider.defaultProps = {
  action: undefined,
};

export default WidgetValueSlider;
