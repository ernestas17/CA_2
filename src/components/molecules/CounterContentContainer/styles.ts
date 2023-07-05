import { styled } from 'styled-components';

export const StyledCounterContentContainer = styled.section`
  max-width: 996px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 50px 30px;
  gap: 20px;

  border: 1px solid whitesmoke;
  border-radius: 4px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const StyledInputsContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const StyledOutputsContainer = styled.div`
  width: 100%;
  display: flex;
`;
