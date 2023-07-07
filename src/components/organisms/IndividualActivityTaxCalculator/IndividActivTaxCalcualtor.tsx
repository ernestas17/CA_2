import { useEffect, useState } from 'react';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import Input from '../../atoms/Input';
import { RadioItem } from '../../atoms/Radio/Radio';
import {
  StyledColumnLable,
  StyledColumnNum,
  StyledLableColumn,
  StyledOutputContainer,
  StyledRow,
  StyledTitleRow,
  SyledRadioWithLabel,
  SyledRadioWrapper,
} from './styles';
import { StyledFieldWithLabel } from '../../molecules/CounterContentContainer/styles';
import Select from '../../atoms/Select';
import { SelectItem } from '../../atoms/Select/Select';

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
    <CounterContentContainer
      useBuiltInStyle
      inputs={
        <>
          <StyledFieldWithLabel>
            <label className='boldLabel'>Skaičiuoja už 2023 m.</label>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label className='boldLabel'>Pajamos</label>
            <Input
              type='number'
              value={income}
              setvalue={setIncome}
              placeholder='0'
              width={250}
            />
          </StyledFieldWithLabel>

          <StyledFieldWithLabel>
            <label className='boldLabel'>Patirtos sąnaudos</label>
            <Input
              type='number'
              value={costsIncurred}
              setvalue={setCostsIncurred}
              placeholder='0'
              width={250}
            />
          </StyledFieldWithLabel>

          <StyledFieldWithLabel>
            <label className='boldLabel'>Sumokėtas VSD</label>
            <Input
              type='number'
              value={paidVSD}
              setvalue={setPaidVSD}
              placeholder='0'
              width={250}
            />
          </StyledFieldWithLabel>

          <StyledFieldWithLabel>
            <label className='boldLabel'>Sumokėtas PSD</label>
            <Input
              type='number'
              value={paidPSD}
              setvalue={setPaidPSD}
              placeholder='0'
              width={250}
            />
          </StyledFieldWithLabel>

          <SyledRadioWithLabel>
            <label className='boldLabel'>Sąnaudų skaičiavimas</label>
            <SyledRadioWrapper>
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
            </SyledRadioWrapper>
          </SyledRadioWithLabel>

          <SyledRadioWithLabel>
            <label className='boldLabel'>Kaupiu pensijai papildomai 3%?</label>
            <SyledRadioWrapper>
              <RadioItem
                label='Nekaupiu'
                value='Ne'
                name='savingAdditional'
                checked={savingAdditional === 'Ne'}
                onChange={handleSavingAdditionalChange}
              />
              <RadioItem
                label='Kaupiu'
                value='Taip'
                name='savingAdditional'
                checked={savingAdditional === 'Taip'}
                onChange={handleSavingAdditionalChange}
              />
            </SyledRadioWrapper>
          </SyledRadioWithLabel>
        </>
      }
      outputs={
        <>
          <StyledFieldWithLabel>
            <label>Gautos pajamos:</label>
            <p>{getStringOrEmpty(getNumberOrZero(incomeReceived))}</p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Patirtos sąnaudos:</label>
            <p>{getStringOrEmpty(getNumberOrZero(calculatedCostsIncurred))}</p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Apmokestinamosios pajamos:</label>
            <p>{getStringOrEmpty(getNumberOrZero(taxableIncome))}</p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label style={{ maxWidth: '70%' }}>
              „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
              įmokos):
            </label>
            <p>{getStringOrEmpty(getNumberOrZero(contributionBase))}</p>
          </StyledFieldWithLabel>
          <StyledOutputContainer>
            <StyledTitleRow>
              <StyledLableColumn>Sodra</StyledLableColumn>
              <StyledColumnLable>{VSDLabel()}</StyledColumnLable>
              <StyledColumnLable>PSD 6.98%</StyledColumnLable>
              <StyledColumnLable>Iš viso</StyledColumnLable>
            </StyledTitleRow>
            <StyledRow>
              <StyledLableColumn>Priskaičiuota:</StyledLableColumn>
              <StyledColumnNum>
                {getStringOrEmpty(getNumberOrZero(calculatedVSD))}
              </StyledColumnNum>
              <StyledColumnNum>
                {getStringOrEmpty(getNumberOrZero(calculatedPSD))}
              </StyledColumnNum>
              <StyledColumnNum>
                {getStringOrEmpty(getNumberOrZero(sodraCalculatedTotal))}
              </StyledColumnNum>
            </StyledRow>
            <StyledRow>
              <StyledLableColumn>Sumokėta:</StyledLableColumn>
              <StyledColumnNum>
                {getStringOrEmpty(getNumberOrZero(paidVSD))}
              </StyledColumnNum>
              <StyledColumnNum>
                {getStringOrEmpty(getNumberOrZero(paidPSD))}
              </StyledColumnNum>
              <StyledColumnNum>
                {getStringOrEmpty(
                  getNumberOrZero(paidVSD) + getNumberOrZero(paidPSD)
                )}
              </StyledColumnNum>
            </StyledRow>
            <StyledRow>
              <StyledLableColumn>Liko mokėti:</StyledLableColumn>
              <StyledColumnNum>
                {isNaN(Number(calculatedVSD))
                  ? '0.00'
                  : (
                      parseFloat(calculatedVSD) - getNumberOrZero(paidVSD)
                    ).toFixed(2)}
              </StyledColumnNum>
              <StyledColumnNum>
                {isNaN(Number(calculatedPSD))
                  ? '0.00'
                  : (
                      parseFloat(calculatedPSD) - getNumberOrZero(paidPSD)
                    ).toFixed(2)}
              </StyledColumnNum>
              <StyledColumnNum>
                {isNaN(Number(sodraCalculatedTotal))
                  ? '0.00'
                  : (
                      parseFloat(sodraCalculatedTotal) -
                      (getNumberOrZero(paidVSD) + getNumberOrZero(paidPSD))
                    ).toFixed(2)}
              </StyledColumnNum>
            </StyledRow>
          </StyledOutputContainer>
          <StyledOutputContainer>
            <StyledTitleRow>
              <label>Gyventojų pajamų mokestis</label>
              <label>Suma</label>
            </StyledTitleRow>
            <StyledFieldWithLabel>
              <label>Pajamų mokesčio kreditas (GMP įst. 18 str.):</label>
              <p>{getStringOrEmpty(getNumberOrZero(incomeTaxCredit))}</p>
            </StyledFieldWithLabel>
            <StyledFieldWithLabel>
              <label>GPM</label>
              <p> {getStringOrEmpty(getNumberOrZero(gmp))}</p>
            </StyledFieldWithLabel>
          </StyledOutputContainer>
          <StyledOutputContainer>
            <StyledTitleRow>
              <label>Iš viso</label>
            </StyledTitleRow>
            <StyledFieldWithLabel>
              <label>Iš viso mokesčių:</label>
              <p>{getStringOrEmpty(getNumberOrZero(totalFees))}</p>
            </StyledFieldWithLabel>
            <StyledFieldWithLabel>
              <label>Grynasis pelnas:</label>
              <p>{getStringOrEmpty(getNumberOrZero(netProfit))}</p>
            </StyledFieldWithLabel>
          </StyledOutputContainer>
        </>
      }
    />
  );
};

export default IndividActivTaxCalcualtor;
