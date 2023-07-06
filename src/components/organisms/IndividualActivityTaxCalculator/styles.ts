import { styled } from 'styled-components';

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;

  h1 {
    align-self: center;
  }
`;

export const SyledRadioWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
`;

export const SyledRadioWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75em;
`;


export const StyledTitleRow1 = styled.div`
  display: flex;
  width: calc(100% - 0.5rem);
  justify-content: space-between;
  background-color: #ff9a0c;
  color: white;
  padding: 0.25rem;
`;

export const StyledTitleRow2 = styled.div`
  width: calc(100% - 0.5rem);
  background-color: #68a5e6;
  color: white;
  padding: 0.25rem;
`;

export const StyledLableColumn = styled.label`
width: 30%;
`;


export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledColumnLable = styled.label`
max-width: 110px;
width: calc(70% / 3);
text-align: right;
`;

export const StyledColumnNum = styled.p`
max-width: 110px;
width: calc(70% / 3);
text-align: right;
`;
