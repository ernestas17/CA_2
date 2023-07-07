import { styled } from 'styled-components';

export const StyledCounterContentContainer = styled.section`
  max-width: 996px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 2.5em 1.875em;
  /* padding: 1.25rem; */ /* Pagal bulmos box turetu buti paddingas 1.25rem */
  gap: 1.25rem;
  color: rgb(54, 54, 54);

  border-radius: 0.375rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);

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

// copied from Vat_calc

export const ExtraStyledInputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;

  margin-bottom: 2.5em;
  padding-bottom: 2.5em;
  border-bottom: 2px solid #ccc;

  @media screen and (min-width: 768px) {
    margin-bottom: 0px;
    padding-bottom: 0px;
    border-bottom: none;

    padding-right: 1.25em;
    border-right: 2px solid #ccc;
  }

  input {
    text-align: end;
  }

  /* .dropdown-content {
    width: 85px;
  } */
`;

export const ExtraStyledOutputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  p {
    font-size: 1.25rem;

    cursor: default;
  }

  div {
    border-bottom: 1px solid #ccc;
  }
`;

//** intended for laying out the page with StyledCounterContentContainer and h1 */
export const StyledCalcSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  h1 {
    align-self: center;
    color: rgb(54, 54, 54);
  }

  .boldLabel{
    font-weight: 600;
  }
`;

//** intended for laying out label and value side by side */
export const StyledFieldWithLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

`;
