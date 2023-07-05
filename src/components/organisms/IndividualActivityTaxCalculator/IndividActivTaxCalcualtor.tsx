import { useEffect, useState } from 'react';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import Input from '../../atoms/Input';
import RadioWrapper, { RadioItem } from '../../atoms/Radio/Radio';
import { StyledRow, StyledTitleRow } from './styles';

const IndividActivTaxCalcualtor = () => {
  // useState for inputs
  const [income, setIncome] = useState<string>('');
  const [costsIncurred, setCostsIncurred] = useState<string>('');
  const [paidVSD, setPaidVSD] = useState<string>('');
  const [paidPSD, setPaidPSD] = useState<string>('');

  //  useState for outputs
  const [incomeReceived, setIncomeReceived] = useState<string>('');

  const [selectedCostCalculation, setSelectedCostCalculation] =
    useState('30% nuo pajamų');

  const [calculatedCostsIncurred, setCalculatedCostsIncurred] =
    useState<string>('');

  const [taxableIncome, setTaxableIncome] = useState<string>('');

  const [contributionBase, setContributionBase] = useState<string>('');

  const [calculatedVSD, setCalculatedVSD] = useState<string>('');
  const [calculatedPSD, setCalculatedPSD] = useState<string>('');
  const [sodraCalculatedTotal, setSodraCalculatedTotal] = useState<string>('');

  const [savingAdditional, setSavingAdditional] = useState<string>('Ne');

  const [incomeTaxCredit, setIncomeTaxCredit] = useState<string>('');
  const [gmp, setGMP] = useState<string>('');
  const [totalFees, setTotalFees] = useState<string>('');
  const [netProfit, setNetProfit] = useState<string>('');

  useEffect(() => {
    calculateOutputs();
  }, [income, costsIncurred, selectedCostCalculation, savingAdditional]);

  const calculateOutputs = () => {
    const calcIncome = parseFloat(income);
    const calcCostsIncurred = parseFloat(costsIncurred);
    const calcPaidVSD = parseFloat(paidVSD);
    const calcPaidPSD = parseFloat(paidPSD);

    let calculatedCostsIncurred = '';
    let taxableIncome = '';
    let calculatedContributionBase = '';
    let calculatedVSD = '';
    let calculatedPSD = '';
    let sodraCalculatedTotal = '';

    const updateVSDandSodraTotal = () => {
      // calculating "Sodra"
      if (savingAdditional === 'Ne') {
        calculatedVSD = (
          (parseFloat(calculatedContributionBase) * 12.52) /
          100
        ).toFixed(2);
      } else {
        calculatedVSD = (
          (parseFloat(calculatedContributionBase) * 15.52) /
          100
        ).toFixed(2);
      }

      sodraCalculatedTotal = (
        parseFloat(calculatedVSD) + parseFloat(calculatedPSD)
      ).toFixed(2);
    };

    const updateTaxibleIncome = () => {
      // calcualting apmokestinamosios pajamos according cost calculation
      if (selectedCostCalculation === '30% nuo pajamų') {
        taxableIncome = (
          calcIncome - parseFloat(calculatedCostsIncurred)
        ).toFixed(2);
      } else {
        taxableIncome = (
          calcIncome -
          calcCostsIncurred -
          parseFloat(sodraCalculatedTotal)
        ).toFixed(2);
      }
    };

    const updatePSD = () => {
      calculatedPSD = Math.max(
        parseFloat(calculatedContributionBase) * 0.0698,
        703.56
      ).toFixed(2);
    };

    if (selectedCostCalculation === '30% nuo pajamų') {
      calculatedCostsIncurred = (calcIncome * 0.3).toFixed(2);
      updateTaxibleIncome(); //nepriklauso nuo sodros
      // calcualting „Sodros“ įmokų bazė according cost calculation
      calculatedContributionBase = (parseFloat(taxableIncome) * 0.9).toFixed(2);
      updatePSD();
      updateVSDandSodraTotal();
    } else {
      calculatedCostsIncurred = calcCostsIncurred.toFixed(2);
      taxableIncome = '';
      // calcualting „Sodros“ įmokų bazė according cost calculation
      calculatedContributionBase = (
        (calcIncome - parseFloat(calculatedCostsIncurred)) *
        0.9
      ).toFixed(2);
      updatePSD();
      updateVSDandSodraTotal();
      updateTaxibleIncome();
    }

    // Calculating Gyventojų pajamų mokestis
    let incomeTaxCredit = '';
    if (parseFloat(taxableIncome) <= 20000) {
      incomeTaxCredit = (parseFloat(taxableIncome) * 0.1).toFixed(2);
    } else {
      const calculatedIncomeTaxCredit =
        parseFloat(taxableIncome) *
        (0.1 - (2 / 300000) * (parseFloat(taxableIncome) - 20000));
      incomeTaxCredit =
        calculatedIncomeTaxCredit < 0
          ? '0'
          : calculatedIncomeTaxCredit.toFixed(2);
    }

    const calculatedGMP =
      parseFloat(taxableIncome) * 0.15 - parseFloat(incomeTaxCredit);

    const calcTotalFees = parseFloat(sodraCalculatedTotal) + calculatedGMP;

    const calcNetProfit =
      calcIncome - (parseFloat(calculatedCostsIncurred) + calcTotalFees);

    setIncomeReceived(calcIncome.toFixed(2));
    setCalculatedCostsIncurred(calculatedCostsIncurred);
    setTaxableIncome(taxableIncome);
    setContributionBase(calculatedContributionBase);
    setCalculatedVSD(calculatedVSD);
    setCalculatedPSD(calculatedPSD);
    setSodraCalculatedTotal(sodraCalculatedTotal);
    setPaidVSD(calcPaidVSD.toFixed(2));
    setPaidPSD(calcPaidPSD.toFixed(2));
    setIncomeTaxCredit(incomeTaxCredit);
    setGMP(calculatedGMP.toFixed(2));
    setTotalFees(calcTotalFees.toFixed(2));
    setNetProfit(calcNetProfit.toFixed(2));
  };

  const handleCostCalculationChange = (value: string) => {
    setSelectedCostCalculation(value);
  };

  const handleSavingAdditionalChange = (value: string) => {
    console.log('Selected saving additional:', value);
    setSavingAdditional(value);
  };

  const VSDLabel = () => {
    return savingAdditional === 'Ne' ? 'VSD 12.52%' : 'VSD 15.52%';
  };

  const getNumberOrZero = (value: string | number): number => {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const getStringOrEmpty = (value: string | number): string => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return '';
  };

  return (
    <div>
      <CounterContentContainer
        inputs={
          <form>
            <div>
              <label>Pajamos</label>
              <Input
                type='number'
                value={income}
                setvalue={setIncome}
                placeholder='Pajamos'
                width={300}
              />
            </div>

            <div>
              <label>Patirtos sąnaudos</label>
              <Input
                type='number'
                value={costsIncurred}
                setvalue={setCostsIncurred}
                placeholder='Patirtos sąnaudos'
                width={300}
              />
            </div>

            <div>
              <label>Sumokėtas VSD</label>
              <Input
                type='number'
                value={paidVSD}
                setvalue={setPaidVSD}
                placeholder='Sumokėtas VSD'
                width={300}
              />
            </div>

            <div>
              <label>Sumokėtas PSD</label>
              <Input
                type='number'
                value={paidPSD}
                setvalue={setPaidPSD}
                placeholder='Sumokėtas PSD'
                width={300}
              />
            </div>

            <div>
              <label>Sąnaudų skaičiavimas</label>
              <RadioWrapper>
                <RadioItem
                  label='30% nuo pajamų'
                  value='30% nuo pajamų'
                  name='costCalculation'
                  checked={selectedCostCalculation === '30% nuo pajamų'}
                  onChange={handleCostCalculationChange}
                />
                <RadioItem
                  label='Faktiškai patirtos'
                  value='Faktiškai patirtos'
                  name='costCalculation'
                  checked={selectedCostCalculation === 'Faktiškai patirtos'}
                  onChange={handleCostCalculationChange}
                />
              </RadioWrapper>
            </div>

            <div>
              <label>Ar kaupiate pensijai papildomai 3%?</label>
              <RadioWrapper>
                <RadioItem
                  label='Ne'
                  value='Ne'
                  name='savingAdditional'
                  checked={savingAdditional === 'Ne'}
                  onChange={handleSavingAdditionalChange}
                />
                <RadioItem
                  label='Taip'
                  value='Taip'
                  name='savingAdditional'
                  checked={savingAdditional === 'Taip'}
                  onChange={handleSavingAdditionalChange}
                />
              </RadioWrapper>
            </div>
          </form>
        }
        outputs={
          <div>
            <div>
              <label>Gautos pajamos:</label>
              <p>{getStringOrEmpty(getNumberOrZero(incomeReceived))}</p>
            </div>
            <div>
              <label>Patirtos sąnaudos:</label>
              <p>
                {getStringOrEmpty(getNumberOrZero(calculatedCostsIncurred))}
              </p>
            </div>
            <div>
              <label>Apmokestinamosios pajamos:</label>
              <p>{getStringOrEmpty(getNumberOrZero(taxableIncome))}</p>
            </div>
            <div>
              <label>
                „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                įmokos):
              </label>
              <p>{getStringOrEmpty(getNumberOrZero(contributionBase))}</p>
            </div>
            <div>
              <StyledTitleRow>
                <label>Sodra</label>
                <label>{VSDLabel()}</label>
                <label>PSD 6.98%</label>
                <label>Iš viso</label>
              </StyledTitleRow>
              <StyledRow>
                <label>Priskaičiuota:</label>
                <p>{getStringOrEmpty(getNumberOrZero(calculatedVSD))}</p>
                <p>{getStringOrEmpty(getNumberOrZero(calculatedPSD))}</p>
                <p>{getStringOrEmpty(getNumberOrZero(sodraCalculatedTotal))}</p>
              </StyledRow>
              <StyledRow>
                <label>Sumokėta:</label>
                <p>{getStringOrEmpty(getNumberOrZero(paidVSD))}</p>
                <p>{getStringOrEmpty(getNumberOrZero(paidPSD))}</p>
                <p>
                  {getStringOrEmpty(
                    getNumberOrZero(paidVSD) + getNumberOrZero(paidPSD)
                  )}
                </p>
              </StyledRow>
              <StyledRow>
                <label>Liko mokėti:</label>
                <p>
                  {isNaN(Number(calculatedVSD))
                    ? ''
                    : parseFloat(calculatedVSD) - getNumberOrZero(paidVSD)}
                </p>
                <p>
                  {isNaN(Number(calculatedPSD))
                    ? ''
                    : parseFloat(calculatedPSD) - getNumberOrZero(paidPSD)}
                </p>
                <p>
                  {isNaN(Number(sodraCalculatedTotal))
                    ? ''
                    : parseFloat(sodraCalculatedTotal) -
                      (getNumberOrZero(paidVSD) + getNumberOrZero(paidPSD))}
                </p>
              </StyledRow>
            </div>
            <div>
              <StyledTitleRow>
                <label>Gyventojų pajamų mokestis</label>
                <label>Suma</label>
              </StyledTitleRow>
              <StyledRow>
                <label>Pajamų mokesčio kreditas (GMP įst. 18 str.):</label>
                <p>{getStringOrEmpty(getNumberOrZero(incomeTaxCredit))}</p>
              </StyledRow>
              <StyledRow>
                <label>GPM</label>
                <p> {getStringOrEmpty(getNumberOrZero(gmp))}</p>
              </StyledRow>
            </div>
            <div>
              <StyledTitleRow>
                <label>Iš viso</label>
              </StyledTitleRow>
              <StyledRow>
                <label>Iš viso mokesčių:</label>
                <p>{getStringOrEmpty(getNumberOrZero(totalFees))}</p>
              </StyledRow>
              <StyledRow>
                <label>Grynasis pelnas:</label>
                <p>{getStringOrEmpty(getNumberOrZero(netProfit))}</p>
              </StyledRow>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default IndividActivTaxCalcualtor;
