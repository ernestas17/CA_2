import { ReactNode } from "react";
import {
  StyledCounterContentContainer,
  StyledInputsContainer,
  StyledOutputsContainer,
} from "./styles";

const CounterContentContainer = ({
  inputs,
  outputs,
}: {
  inputs: ReactNode;
  outputs: ReactNode;
}) => {
  return (
    <StyledCounterContentContainer>
      <StyledInputsContainer>{inputs}</StyledInputsContainer>
      <StyledOutputsContainer>{outputs}</StyledOutputsContainer>
    </StyledCounterContentContainer>
  );
};

export default CounterContentContainer;

//example how to insert in page:
{
  /* <div>
<CounterContentContainer
  inputs={
    <div>
      <div>Input 1</div>
      <div>Input 2</div>
      <div>Input 3</div>
    </div>
  }
  outputs={
    <div>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  }
/>
</div> */
}
