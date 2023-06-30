import { useState } from 'react';
import { StyledCheckboxInput, StyledCheckboxLabel } from './styles';

interface ILabelProps {
  label: string;
}

const Checkbox = ({ label }: ILabelProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <StyledCheckboxInput
        type='checkbox'
        id='checkbox'
        checked={isChecked}
        onChange={checkHandler}
      />
      <StyledCheckboxLabel htmlFor='checkbox'>{label}</StyledCheckboxLabel>
    </div>
  );
};

export default Checkbox;

// example how to insert Checkbox
// <Checkbox label={' needed text'} />
