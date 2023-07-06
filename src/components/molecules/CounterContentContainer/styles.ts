import { styled } from 'styled-components';

export const StyledCounterContentContainer = styled.section`
  max-width: 996px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 50px 30px;
  /* padding: 1.25rem; */ /* Pagal bulmos box turetu buti paddingas 1.25rem */
  gap: 20px;


  border: 1px solid whitesmoke;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);

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

  /* .dropdown-content {
    width: 85px;
  } */
`;

export const ExtraStyledOutputsContainer = styled.div`
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

//** intended for laying out the page with StyledCounterContentContainer and h1 */
export const StyledCalcSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;

  h1 {
    align-self: center;
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
