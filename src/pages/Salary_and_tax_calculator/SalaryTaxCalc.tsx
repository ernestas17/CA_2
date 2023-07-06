import { StyledCalcSection } from '../../components/molecules/CounterContentContainer/styles';
import Salary_Tax_Calc from '../../components/organisms/Slary_Tax_Calc';

const SalaryTaxCalc = () => {
  return (
    <StyledCalcSection>
      <h1>Atlyginimo ir mokesčių skaičiuoklė</h1>
      <Salary_Tax_Calc />
    </StyledCalcSection>
  );
};

export default SalaryTaxCalc;
