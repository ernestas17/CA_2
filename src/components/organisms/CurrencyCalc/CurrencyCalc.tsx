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
import { StyledCurrencyLabel } from './styles';
import { StyledFieldWithLabel } from '../../molecules/CounterContentContainer/styles';
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
      useBuiltInStyle
      inputs={
        <>
          <StyledFieldWithLabel>
            <label>Turima valiuta</label>
            <Select
              setvalue={setInputCurrency}
              initialIndex={
                currencyList && Object.keys(currencyList).length ? 0 : null
              }
              disabled={loading || !currencyList}
              style={{ fullWidth: true, maxRows: 8 }}
            >
              {renderCurrencySelection()}
            </Select>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Suma {inputCurrency && inputCurrency.toUpperCase()}</label>
            <Input
              type='number'
              value={inputValue}
              setvalue={setInputValue}
            ></Input>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Norima valiuta</label>
            <Select
              setvalue={setOutputCurrency}
              initialIndex={
                currencyList && Object.keys(currencyList).length ? 0 : null
              }
              disabled={loading || !currencyList}
              style={{ fullWidth: true, maxRows: 5 }}
            >
              {renderCurrencySelection()}
            </Select>
          </StyledFieldWithLabel>
        </>
      }
      outputs={
        inputCurrency && (
          <>
            <StyledFieldWithLabel>
              <label>{inputCurrency.toUpperCase()}</label>
              <p>{inputValue}</p>
            </StyledFieldWithLabel>
            {outputCurrency &&
              (rates ? (
                <StyledFieldWithLabel>
                  <label>
                    {outputCurrency && outputCurrency.toUpperCase()}
                  </label>
                  <p>
                    {rates[outputCurrency] &&
                      rates[outputCurrency] * inputValue}
                  </p>
                </StyledFieldWithLabel>
              ) : (
                <div>Something went wrong...</div>
              ))}
          </>
        )
      }
    />
  );
};

export default CurrencyCalc;