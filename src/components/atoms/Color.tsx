import * as React from 'react';
import { cleanString } from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  defaultValue: string | number,
  action?: ((value: string) => void),
};

const WidgetDropdown = ({ name, defaultValue, action }: WDropdownProps): React.ReactElement => {
  const inputRef = React.createRef<HTMLInputElement>();

  // Input Change Handler
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!action || !e) {
      console.error('Error: No onchange function given for component');
      return;
    }
    const target = e.target as HTMLInputElement;
    action(target.value);
  };

  return (
    <input
      id={`color_${cleanString(name)}`}
      type="color"
      value={defaultValue}
      onChange={inputChange}
      ref={inputRef}
    />
  );
};

WidgetDropdown.defaultProps = {
  action: undefined,
};

export default WidgetDropdown;
