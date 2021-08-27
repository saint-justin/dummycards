import * as React from 'react';
import { useState } from 'react';
import { RelativePositionTypes, AlignmentType } from '../../types';
import helper from '../../utils/Helpers';

type WDropdownProps = {
  name: string,
  options: string[],
  initialProperty: RelativePositionTypes,
  alignmentType: AlignmentType,
  action?: ((at: AlignmentType, rpt: RelativePositionTypes) => void),
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

  // Initial states
  const [positionType, setPositionType] = useState<RelativePositionTypes>(initialProperty);

  // Refs to input and select elements
  const selectRef = React.createRef<HTMLSelectElement>();

  // Helper fxns to clean names and generate option boxes from strings
  const generateOptions = (opts: string[]) => opts.map(
    (s: string): JSX.Element => <option value={s.toLowerCase()} key={s}>{s}</option>,
  );

  // Event for handling select changes
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    // Error out for faulty values
    if (!e) {
      console.error('Error: Select handle event returned faulty value');
      return;
    }

    if (['start', 'end', 'center'].includes(e.target.value)) {
      const newValue = e.target.value as RelativePositionTypes;
      setPositionType(newValue);

      if (!action) return;
      action(alignmentType, positionType);
    }
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
