import { StyledCalcSection } from '../../components/molecules/CounterContentContainer/styles';
import IndividActivTaxCalcualtor from '../../components/organisms/IndividualActivityTaxCalculator';

const IndividualActivityTaxCalc = () => {
  return (
    <StyledCalcSection>
      <h1>Individualios veiklos skaičiuoklė</h1>
      <IndividActivTaxCalcualtor />
    </StyledCalcSection>
  );
};

export default IndividualActivityTaxCalc;
