import * as React from 'react';
import { capitalizeFirst, cleanString } from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  options: string[],
  defaultOption: string,
  action: ((str: string) => void),
};

const WidgetDropdown = (props: WDropdownProps): JSX.Element => {
  const {
    name,
    options,
    defaultOption,
    action,
  } = props;

  // Helper fxns to clean names and generate option boxes from strings
  const generateOptions = (opts: string[]): JSX.Element[] => {
    let defaultSelected = false;
    const elements = opts.map((s: string): JSX.Element => {
      if (s === defaultOption) defaultSelected = true;
      // eslint-disable-next-line max-len
      return <option value={s.toLowerCase()} key={s}>{capitalizeFirst(s)}</option>;
    });
    if (!defaultSelected) throw new Error('Error: No default element selected in dropdown');
    return elements;
  };

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e || !e.target || !e.target.value) {
      console.error(`Error: Dropdown handle event returned faulty value on element (${name})`);
      return;
    }

    // Converts the given value to a real value based on lookup table
    const val = e.target?.value;

    // Update the parent w/ the given action if able
    if (!action) throw new Error(`Error: Action not implemented for dropdown (${name})`);
    action(val);
  };

  return (
    <div className="flex-row" id={`dropdown_${cleanString(name)}`}>
      <select
        onChange={handleSelectChange}
        defaultValue={defaultOption}
      >
        {generateOptions(options)}
      </select>
    </div>
  );
};

export default WidgetDropdown;
