import { styled } from "styled-components";

export const StyledRadioLabelWrapper = styled.div`
  width: 100%;
  width: fit-content;
  display: flex;
  gap: 0.25rem;
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
