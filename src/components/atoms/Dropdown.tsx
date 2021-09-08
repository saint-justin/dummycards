import * as React from 'react';
import { useEffect } from 'react';
import { capitalizeFirst } from '../../utils/Helpers';

import './styles/Dropdown.scss';

type WDropdownProps = {
  name: string,
  id: string,
  options: string[],
  defaultOption: string,
  action: ((str: string) => void),
  ref?: React.MutableRefObject<HTMLSelectElement>
};

const WidgetDropdown = (props: WDropdownProps): JSX.Element => {
  const {
    name,
    id,
    options,
    defaultOption,
    action,
    ref,
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
    <div className="flex-row generic-dropdown" id={id}>
      <select
        onChange={handleSelectChange}
        placeholder={defaultOption}
        ref={ref}
      >
        {generateOptions(options)}
      </select>
    </div>
  );
};

WidgetDropdown.defaultProps = {
  ref: null,
};

export default WidgetDropdown;
