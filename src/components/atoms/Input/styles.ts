import { styled } from "styled-components";

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  border-radius: 4px;

  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border linear 0.2s, box-shadow linear 0.2s;

  padding: calc(0.5em - 1px) calc(0.75em - 1px);
`;

export const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: calc(0.75em - 1px);

  font-size: 1em;
  line-height: 1.5;
  color: #555;

  &::placeholder {
    color: #d0d0d0;
  }
`;
