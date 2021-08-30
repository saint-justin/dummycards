import * as React from 'react';

type WInputProps = {
  name: string,
  labelFor: string,
};

// eslint-disable-next-line max-len
const WidgetInput = ({ name, labelFor }: WInputProps): React.ReactElement => <label htmlFor={labelFor}>{ name }</label>;

export default WidgetInput;
