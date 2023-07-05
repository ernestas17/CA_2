import { useEffect, useState } from 'react';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import Input from '../../atoms/Input';
import RadioWrapper, { RadioItem } from '../../atoms/Radio/Radio';
import Checkbox from '../../atoms/Checkbox';

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
//   const [sodraPaidTotal, setSodraPaidTotal] = useState<string>('');

  const [savingAdditional, setSavingAdditional] = useState<string>('Ne');

  useEffect(() => {
    calculateOutputs();
  }, [
    income,
    costsIncurred,
    selectedCostCalculation,
    savingAdditional,
    // calculatedCostsIncurred,
    // taxableIncome,
    // sodraCalculatedTotal,
    //sodraPaidTotal,
  ]);

  
  const calculateOutputs = () => {
    const calcIncome = parseFloat(income);
    const calcCostsIncurred = parseFloat(costsIncurred);
    const calcPaidVSD = parseFloat(paidVSD);
    const calcPaidPSD = parseFloat(paidPSD);

    let calculatedCostsIncurred;
    let taxableIncome;
    let calculatedContributionBase;
    let calculatedVSD = '';
    let calculatedPSD = '';
    let sodraCalculatedTotal = '';
    // let sodraPaidTotal = '';

    // calcualting patirtos sąnaudos according cost calculation
    if (selectedCostCalculation === '30% nuo pajamų') {
      calculatedCostsIncurred = (calcIncome * 0.3).toFixed(2);
    } else {
      calculatedCostsIncurred = calcCostsIncurred.toFixed(2);
    }

    //console.log(`selectedCostCalculation ${selectedCostCalculation}`);

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
      console.log('sodraCalculatedTotal' + sodraCalculatedTotal);
    }

    // calcualting „Sodros“ įmokų bazė according cost calculation
    if (selectedCostCalculation === '30% nuo pajamų') {
      calculatedContributionBase = (parseFloat(taxableIncome) * 0.9).toFixed(2);
    } else {
      calculatedContributionBase = (
        (calcIncome - parseFloat(calculatedCostsIncurred)) *
        0.9
      ).toFixed(2);
    }

    // calculating "Sodra"
    if (savingAdditional === 'Ne') {
      const calculatedVSDValue = (
        (parseFloat(contributionBase) * 12.52) /
        100
      ).toFixed(2);
      setCalculatedVSD(calculatedVSDValue);
    } else {
      const calculatedVSDValue = (
        (parseFloat(contributionBase) * 15.52) /
        100
      ).toFixed(2);
      setCalculatedVSD(calculatedVSDValue);
    }

    // calculating "Sodra" contributions
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

    // if (parseFloat(taxableIncome) <= 20000 ) {
    //   const oneMonthPSD = (840 * 6.98) / 100;
    //   calculatedPSD = (oneMonthPSD * 12).toFixed(2);
    // } else {
    //   calculatedPSD = (
    //     (parseFloat(calculatedContributionBase) * 6.98) /
    //     100
    //   ).toFixed(2);
    // }

    // if (
    //   (parseFloat(taxableIncome) <= 20000 &&
    //     selectedCostCalculation === '30% nuo pajamų') ||
    //   (parseFloat(taxableIncome) <= 20000 &&
    //     selectedCostCalculation === 'Faktiškai patirtos')
    // ) {
    //   const oneMonthPSD = (840 * 6.98) / 100;
    //   calculatedPSD = (oneMonthPSD * 12).toFixed(2);
    // } else {
    //   calculatedPSD = (
    //     (parseFloat(calculatedContributionBase) * 6.98) /
    //     100
    //   ).toFixed(2);
    // }

    if (
      parseFloat(taxableIncome) <= 20000 &&
      (selectedCostCalculation === '30% nuo pajamų' ||
        selectedCostCalculation === 'Faktiškai patirtos')
    ) {
      //   const oneMonthPSD = (840 * 6.98) / 100;
      //   calculatedPSD = (oneMonthPSD * 12).toFixed(2);
      console.log('selectedCostCalculation' + selectedCostCalculation);
      console.log(taxableIncome);
      calculatedPSD = (((840 * 6.98) / 100) * 12).toFixed(2);
    } else {
      console.log(selectedCostCalculation);
      calculatedPSD = (
        (parseFloat(calculatedContributionBase) * 6.98) /
        100
      ).toFixed(2);
    }

    sodraCalculatedTotal = (
      parseFloat(calculatedVSD) + parseFloat(calculatedPSD)
    ).toFixed(2);

    // sodraPaidTotal = (calcPaidVSD + calcPaidPSD).toFixed(2);

    // console.log(`calculatedCostsIncurred ${calculatedCostsIncurred}`);
    // console.log(`calculatedContributionBase ${calculatedContributionBase}`);
    // console.log(`calculatedPSD ${calculatedPSD}`);

    setIncomeReceived(calcIncome.toFixed(2));
    setCalculatedCostsIncurred(calculatedCostsIncurred);
    setTaxableIncome(taxableIncome);
    setContributionBase(calculatedContributionBase);
    setCalculatedVSD(calculatedVSD);
    setCalculatedPSD(calculatedPSD);
    setSodraCalculatedTotal(sodraCalculatedTotal);
    setPaidVSD(calcPaidVSD.toFixed(2));
    setPaidPSD(calcPaidPSD.toFixed(2));
    // setSodraPaidTotal(sodraPaidTotal);
  };

  const handleCostCalculationChange = (value: string) => {
    //console.log('Selected cost calculation:', value);
    setSelectedCostCalculation(value);
  };

  const handleSavingAdditionalChange = (value: string) => {
    console.log('Selected saving additional:', value);
    setSavingAdditional(value);
  };

  const VSDLabel = () => {
    return savingAdditional === 'Ne' ? 'VSD 12.52%' : 'VSD 15.52%';
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
              <p>{isNaN(Number(incomeReceived)) ? '' : incomeReceived}</p>
            </div>
            <div>
              <label>Patirtos sąnaudos:</label>
              <p>
                {isNaN(Number(calculatedCostsIncurred))
                  ? ''
                  : calculatedCostsIncurred}
              </p>
            </div>
            <div>
              <label>Apmokestinamosios pajamos:</label>
              <p>{isNaN(Number(taxableIncome)) ? '' : taxableIncome}</p>
            </div>
            <div>
              <label>
                „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                įmokos):
              </label>
              <p>{isNaN(Number(contributionBase)) ? '' : contributionBase}</p>
            </div>
            <div>
              <div className='titleRow'>
                <label>Sodra</label>
                <label>{VSDLabel()}</label>
                <label>PSD 6.98%</label>
                <label>Iš viso</label>
              </div>
              <div className='row'>
                <label>Priskaičiuota:</label>
                <p>{isNaN(Number(calculatedVSD)) ? '' : calculatedVSD}</p>
                <p>{isNaN(Number(calculatedPSD)) ? '' : calculatedPSD}</p>
                <p>
                  {isNaN(Number(sodraCalculatedTotal))
                    ? ''
                    : sodraCalculatedTotal}
                </p>
              </div>
              <div className='row'>
                <label>Sumokėta:</label>
                <p>
                  {isNaN(Number(paidVSD)) ? '' : Number(paidVSD).toFixed(2)}
                </p>
                <p>
                  {isNaN(Number(paidPSD)) ? '' : Number(paidPSD).toFixed(2)}
                </p>
                <p>{isNaN(parseFloat(paidVSD)) || isNaN(parseFloat(paidPSD))? '' : (parseFloat(paidVSD) + parseFloat(paidPSD)).toFixed(2)}</p>
              </div>
              <div className='row'>
                <label>Liko mokėti:</label>
                <p>
                  {isNaN(Number(calculatedVSD)) || isNaN(Number(paidVSD))
                    ? ''
                    : parseFloat(calculatedVSD) - parseFloat(paidVSD)}
                </p>
                <p>
                  {isNaN(Number(calculatedPSD)) || isNaN(Number(paidPSD))
                    ? ''
                    : parseFloat(calculatedPSD) - parseFloat(paidPSD)}
                </p>
                <p>
                  {isNaN(Number(sodraCalculatedTotal)) ||
                  isNaN(Number(paidVSD)) ||
                  isNaN(Number(paidPSD))
                    ? ''
                    : parseFloat(sodraCalculatedTotal) -
                      (parseFloat(paidVSD) + parseFloat(paidPSD))}
                </p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default IndividActivTaxCalcualtor;
