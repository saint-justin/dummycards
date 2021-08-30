import * as React from 'react';
import { useEffect } from 'react';
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
  // eslint-disable-next-line max-len
  const generateOptions = (opts: string[]): JSX.Element[] => opts.map((s: string): JSX.Element => <option value={s.toLowerCase()} key={s}>{capitalizeFirst(s)}</option>);

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e || !e.target || !e.target.value) {
      console.error(`Error: Dropdown handle event returned faulty value on element (${name})`);
      return;
    }

    // Update the parent w/ the given action if able
    if (!action) throw new Error(`Error: Action not implemented for dropdown (${name})`);

    // Set in the value
    const val = e.target.value;
    action(val);
  };

  useEffect(() => {
    action(defaultOption);
  }, []);

  return (
    <div className="flex-row" id={`dropdown_${cleanString(name)}`}>
      <select
        onChange={handleSelectChange}
        placeholder={defaultOption}
      >
        {generateOptions(options)}
      </select>
    </div>
  );
};

export default WidgetDropdown;
