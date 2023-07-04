import { styled } from "styled-components";

export const StyledVatContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;

  h1 {
    align-self: center;
  }
`;

export const StyledVatInputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  margin-bottom: 50px;
  padding-bottom: 50px;
  border-bottom: 2px solid #ccc;

  @media screen and (min-width: 768px) {
    margin-bottom: 0px;
    padding-bottom: 0px;
    border-bottom: none;

    padding-right: 20px;
    border-right: 2px solid #ccc;
  }

  input {
    text-align: end;
  }

  .dropdown-content {
    width: 85px;
  }
`;

export const StyledVatOutputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 35px;

  p {
    font-size: 20px;

    cursor: default;
  }

  div {
    border-bottom: 1px solid #ccc;
  }
`;

export const StyledVatContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
`;
