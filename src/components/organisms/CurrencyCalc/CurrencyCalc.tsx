import { useEffect, useState, useContext } from 'react';
import {
  CurrencyContext,
  CurrencyListType,
  CurrencyRatesSetType,
  POPULAR_CURRENCIES,
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

  const renderCurrencySelection = (duplicatePopularOnTop?: boolean) => {
    if (currencyList && Object.keys(currencyList).length) {
      const popularCurrencies = POPULAR_CURRENCIES;
      return [
        <SelectItem key={`itm0`} value={null}>
          ...
        </SelectItem>,
      ]
        .concat(
          duplicatePopularOnTop
            ? Object.entries(currencyList)
                .filter((entry) =>
                  popularCurrencies.includes(entry[0].toUpperCase())
                )
                .map((entry, index) => (
                  <SelectItem key={`itm${index + 1}`} value={entry[0]}>
                    <StyledCurrencyLabel>
                      <span className='currency-code-label'>{entry[0]}</span>
                      <span className='title'>{entry[1]}</span>
                    </StyledCurrencyLabel>
                  </SelectItem>
                ))
            : []
        )
        .concat(
          Object.entries(currencyList).map((entry, index) => (
            <SelectItem
              key={`itm${
                index +
                1 +
                (duplicatePopularOnTop ? popularCurrencies.length : 0)
              }`}
              value={entry[0]}
            >
              <StyledCurrencyLabel>
                <span className='currency-code-label'>{entry[0]}</span>
                <span className='title'>{entry[1]}</span>
              </StyledCurrencyLabel>
            </SelectItem>
          ))
        );
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
            <label className='boldLabel'>Turima valiuta</label>
            <Select
              setvalue={setInputCurrency}
              initialIndex={0}
              disabled={loading || !currencyList}
              style={{ fullWidth: true, maxRows: 8 }}
            >
              {renderCurrencySelection(true)}
            </Select>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label className='boldLabel'>Suma {inputCurrency && inputCurrency.toUpperCase()}</label>
            <Input
              type='number'
              value={inputValue}
              setvalue={setInputValue}
            ></Input>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label className='boldLabel'>Norima valiuta</label>
            <Select
              setvalue={setOutputCurrency}
              initialIndex={0}
              disabled={loading || !currencyList}
              style={{ fullWidth: true, maxRows: 5 }}
            >
              {renderCurrencySelection(true)}
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
