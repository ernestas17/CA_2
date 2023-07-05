import React, { ChangeEvent } from 'react';
import { StyledRadio, StyledRadioLabelWrapper } from './styles';

interface IRadioProps {
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export const RadioItem = ({
  label,
  value,
  name,
  checked,
  onChange,
}: IRadioProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <StyledRadioLabelWrapper>
      <StyledRadio
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </StyledRadioLabelWrapper>
  );
};

const RadioWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RadioWrapper;

// example how to insert Checkbox
{
  /* <RadioWrapper>
<RadioItem label="hi1" name="hi" checked={true} />
<RadioItem label="hi2" name="hi" />
<RadioItem label="hi3" name="hi" />
<RadioItem label="hi4" name="hi" />
<RadioItem label="hi5" name="hi" />
</RadioWrapper> */
}
