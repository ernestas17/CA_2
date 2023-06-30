import React, { useRef } from "react";
import { StyledRadio, StyledRadioLabelWrapper } from "./styles";

interface IRadioProps {
  label: string;
  name: string;
  checked?: boolean;
}

export const RadioItem = ({ label, name, checked }: IRadioProps) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (radioRef.current) {
      radioRef.current.checked = true;
    }
  };

  return (
    <StyledRadioLabelWrapper onClick={handleLabelClick}>
      <StyledRadio
        ref={radioRef}
        type="radio"
        name={name}
        defaultChecked={checked}
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
