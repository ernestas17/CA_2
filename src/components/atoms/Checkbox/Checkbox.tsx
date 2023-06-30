import { useState } from 'react';
import { StyledCheckboxInput, StyledCheckboxLabel } from './styles';

interface ILabelProps {
  label: string;
}

const Checkbox = ({ label }: ILabelProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxId = `checkbox-${label}`;

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <StyledCheckboxInput
        type='checkbox'
        id={checkboxId}
        checked={isChecked}
        onChange={checkHandler}
      />
      <StyledCheckboxLabel htmlFor={checkboxId}>{label}</StyledCheckboxLabel>
    </div>
  );
};

export default Checkbox;

// example how to insert Checkbox
// <Checkbox label={' needed text'} />
