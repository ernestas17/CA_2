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
  /* flex-direction: column; */
  /* gap: 0.5em; */
  gap: 1.5em;
`;

export const SyledRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.5rem; */
`;

export const StyledOutputContainer = styled.div`
  &:last-child {
    border: none;
  }
`;

export const StyledTitleRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: rgb(62, 142, 208);
  color: white;
  padding: 0.25rem;
  font-weight: 600;
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
