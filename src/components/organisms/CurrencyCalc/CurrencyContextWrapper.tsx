import { ReactNode, createContext, useState } from 'react';

export type CurrencyListType = { [key: string]: string };
export type CurrencyRatesSetType = { [key: string]: number };
type CurrencyRatesMatrixType = { [key: string]: CurrencyRatesSetType };

interface ICurrencyContext {
  getCurrencyList:
    | ((callback?: (list: CurrencyListType | null) => void) => void)
    | null;
  getRates:
    | ((
        base: string,
        callback?: (rates: CurrencyRatesSetType | null) => void
      ) => void)
    | null;
}

export const POPULAR_CURRENCIES = ['USD', 'GBP', 'EUR'];

export const CurrencyContext = createContext<ICurrencyContext>({
  getCurrencyList: null,
  getRates: null,
});

export default function CurrencyContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [currencyList, setCurrencyList] = useState<CurrencyListType | null>(
    null
  );
  const [currencyRatesMatrix, setCurrencyRatesMatrix] =
    useState<CurrencyRatesMatrixType | null>(null);

  const fetchCurrencyList = async (
    callback?: (list: CurrencyListType | null) => void
  ) => {
    let result = null;

    if (!currencyList) {
      try {
        const data: CurrencyListType = await (
          await fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json`
          )
        ).json();
        if (Object.keys(data)?.length) {
          result = data;
          setCurrencyList(data);
        } else {
          throw 'response does not contain expected data';
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (callback) {
      callback(currencyList ?? result);
    }
  };

  const fetchRates = async (
    base: string,
    callback?: (rates: CurrencyRatesSetType | null) => void
  ) => {
    let result = null;

    if (!currencyRatesMatrix || !currencyRatesMatrix[base]) {
      try {
        const data = await (
          await fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base.toLowerCase()}.json`
          )
        ).json();
        if (data[base]) {
          result = data[base];
          // useReducer?
          setCurrencyRatesMatrix((prev) => {
            return { ...prev, [base]: data[base] };
          });
        } else {
          throw 'response does not contain expected data';
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (callback) {
      callback(
        currencyRatesMatrix && currencyRatesMatrix[base]
          ? currencyRatesMatrix[base]
          : result
      );
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        getCurrencyList: fetchCurrencyList,
        getRates: fetchRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
