import * as React from 'react';

import './styles/Label.scss';

type WInputProps = {
  name: string,
  labelFor: string,
};

// eslint-disable-next-line max-len
const WidgetInput = ({ name, labelFor }: WInputProps): React.ReactElement => <label htmlFor={labelFor} className="label-generic">{ name }</label>;

export default WidgetInput;
