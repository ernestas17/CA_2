import { styled } from "styled-components";

export const StyledRadioLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  line-height: 1.25;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }

  cursor: pointer;
`;
export const StyledRadio = styled.input`
  cursor: pointer;
`;
