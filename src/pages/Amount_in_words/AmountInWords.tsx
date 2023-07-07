import { StyledCalcSection } from '../../components/molecules/CounterContentContainer/styles';
import AmountInWordsLogic from '../../components/organisms/AmuontInWordslogic';

const AmountInWords = () => {
  return (
    <StyledCalcSection>
      <h1>Suma žodžiais</h1>
      <AmountInWordsLogic />
    </StyledCalcSection>
  );
};

export default AmountInWords;
