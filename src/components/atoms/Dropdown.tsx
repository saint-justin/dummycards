import * as React from 'react';
import { RelativePositionType, AlignmentType, DropdownOpt } from '../../types';
import helper from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  options: DropdownOpt[],
  initialProperty: RelativePositionType,
  alignmentType: AlignmentType,
  action?: ((at: AlignmentType, rpt: RelativePositionType) => void),
};

const WidgetDropdown = (props: WDropdownProps): JSX.Element => {
  // Obj destructuring
  const {
    name,
    options,
    initialProperty,
    alignmentType,
    action,
  } = props;

  // Initial state, ref, and lookup table
  const selectRef = React.createRef<HTMLSelectElement>();
  const lookup = {
    left: 'start',
    top: 'start',
    center: 'center',
    right: 'end',
    bottom: 'end',
  };

  // Helper fxns to clean names and generate option boxes from strings
  const generateOptions = (opts: DropdownOpt[]) => opts.map(
    (s: DropdownOpt): JSX.Element => <option value={s.toLowerCase()} key={s}>{s}</option>,
  );

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e || !e.target || !e.target.value) {
      console.error('Error: Select handle event returned faulty value');
      return;
    }

    // Converts the given value to a real value based on lookup table
    const val = e?.target?.value;
    if (val !== 'top' && val !== 'left' && val !== 'center' && val !== 'right' && val !== 'bottom') {
      throw new Error(`Error: Invalid value passed to lookup table on Dropdown Molecule (${name})`);
    }
    const newValue = e.target.value as DropdownOpt;
    const converted = lookup[newValue] as RelativePositionType;

    // Update the parent w/ the given action if able
    if (!action) throw new Error(`Error: Action not implemented for button (${name})`);
    action(alignmentType, converted);
  };

  return (
    <>
      <label htmlFor={`select_${helper.cleanString(name)}`}>{name}</label>
      <div className="flex-row" id={`select_${helper.cleanString(name)}`}>
        <select
          onChange={handleSelectChange}
          ref={selectRef}
          defaultValue={initialProperty}
        >
          {generateOptions(options)}
        </select>
      </div>
    </>
  );
};

WidgetDropdown.defaultProps = {
  action: undefined,
};

export default WidgetDropdown;
