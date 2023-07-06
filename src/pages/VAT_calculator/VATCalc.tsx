import { StyledCalcSection } from '../../components/molecules/CounterContentContainer/styles';
import Vat_calc from '../../components/organisms/Vat_calc';

const VATCalc = () => {
  return (
    <StyledCalcSection>
      <h1>PVM Skaičiuoklė</h1>
      <Vat_calc />
    </StyledCalcSection>
  );
};

export default VATCalc;
