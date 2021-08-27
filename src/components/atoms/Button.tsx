import * as React from 'react';

type WInputProps = {
  name: string,
  action?: (() => void),
};

const WidgetInput = ({ name, action }: WInputProps): React.ReactElement => <button type="button" onClick={action}>{ name }</button>;

WidgetInput.defaultProps = {
  action: () => { throw new Error('No action implemented for button'); },
};

export default WidgetInput;
