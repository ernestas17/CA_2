import { useRef } from "react";
import { StyledRadio, StyledRadioLabelWrapper } from "./styles";

type RadioProps = {
  label: string;
  name: string;
  checked?: boolean;
};

const Radio = ({ label, name, checked }: RadioProps) => {
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

export default Radio;

// example how to insert Checkbox
// <div>
// <Radio label="Faktiškai patirtos" checked={true} />
// <Radio label="30% nuo pajamų" />
// <Radio label="Other text" />
// </div>
