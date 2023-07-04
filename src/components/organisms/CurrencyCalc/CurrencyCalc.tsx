import { useEffect, useState, useContext } from 'react';
import {
  CurrencyContext,
  CurrencyListType,
  CurrencyRatesSetType,
} from './CurrencyContextWrapper';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import { SelectItem } from '../../atoms/Select/Select';
import { StyledCurrencyLabel } from '../../../pages/Currency_calculator/styles';
const CurrencyCalc = () => {
  const [currencyList, setCurrencyList] = useState<CurrencyListType | null>(
    null
  );
  const [rates, setRates] = useState<CurrencyRatesSetType | null>(null);
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputCurrency, setInputCurrency] = useState<string | null>(null);
  const [outputCurrency, setOutputCurrency] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { getCurrencyList, getRates } = useContext(CurrencyContext);

  useEffect(() => {
    // console.log('useEffect CurrencyCalc 0');

    if (getCurrencyList) {
      getCurrencyList((list) => {
        setLoading(false);

        setCurrencyList(list);
      });
    }
  }, [getCurrencyList]);

  useEffect(() => {
    // console.log('useEffect CurrencyCalc 1');

    if (getRates && inputCurrency) {
      getRates(inputCurrency, (rates) => {
        setLoading(false);

        setRates(rates);
      });
    }
  }, [getRates, inputCurrency]);

  const renderCurrencySelection = () => {
    if (currencyList && Object.keys(currencyList).length) {
      return [
        <SelectItem key={`itm0`} value={null}>
          ...
        </SelectItem>,
        ...Object.entries(currencyList).map((entry, index) => (
          <SelectItem key={`itm${index + 1}`} value={entry[0]}>
            <StyledCurrencyLabel>
              <span className='currency-code-label'>{entry[0]}</span>
              <span className='title'>{entry[1]}</span>
            </StyledCurrencyLabel>
          </SelectItem>
        )),
      ];
    } else {
      return <SelectItem value={null}>...</SelectItem>;
    }
  };

  //TODO: fault handling & loading state

  return (
    <CounterContentContainer
      inputs={
        <div>
          <div>
            <label>Turima valiuta</label>
            <Select
              setvalue={setInputCurrency}
              initialIndex={0}
              style={{ fullWidth: true, maxRows: 8 }}
            >
              {renderCurrencySelection()}
            </Select>
          </div>
          <div>
            <label>Suma {inputCurrency && inputCurrency.toUpperCase()}</label>
            <Input
              type='number'
              value={inputValue}
              setvalue={setInputValue}
            ></Input>
          </div>
          <div>
            <label>Norima valiuta</label>
            <Select
              setvalue={setOutputCurrency}
              initialIndex={0}
              style={{ fullWidth: true, maxRows: 5 }}
            >
              {renderCurrencySelection()}
            </Select>
          </div>
        </div>
      }
      outputs={
        <div>
          {inputCurrency && outputCurrency && rates && (
            <div>
              <span>
                {rates[outputCurrency] && rates[outputCurrency] * inputValue}
              </span>
              <span>{outputCurrency && outputCurrency.toUpperCase()}</span>
            </div>
          )}
        </div>
      }
    />
  );
};

export default CurrencyCalc;
