import { StyledCalcSection } from '../../components/molecules/CounterContentContainer/styles';
import CurrencyCalcComponent from '../../components/organisms/CurrencyCalc';

const CurrencyCalc = () => {
  return (
    <StyledCalcSection>
      <h1>Valiutos konvertavimas</h1>
      <CurrencyCalcComponent />
    </StyledCalcSection>
  );
};

export default CurrencyCalc;
