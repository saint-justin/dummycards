import * as React from 'react';

import './styles/Slider.scss';

type WInputProps = {
  name: string,
  min: number,
  max: number,
  defaultValue: number,
  action: (n: number) => void,
};

// eslint-disable-next-line max-len
const WidgetInput = (props: WInputProps): React.ReactElement => {
  const {
    name, min, max, defaultValue, action,
  } = props;

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    action(parseInt(target.value, 10));
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={defaultValue}
      className="default-slider"
      id={name}
      onChange={changeHandler}
    />
  );
};

export default WidgetInput;
