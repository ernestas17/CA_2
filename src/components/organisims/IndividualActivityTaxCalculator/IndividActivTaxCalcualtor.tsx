import { useEffect, useState } from 'react';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import Input from '../../atoms/Input';
import RadioWrapper, { RadioItem } from '../../atoms/Radio/Radio';

const IndividActivTaxCalcualtor = () => {
  const [income, setIncome] = useState<string>('');
  const [incomeReceived, setIncomeReceived] = useState<string>('');

  const [selectedCostCalculation, setSelectedCostCalculation] =
    useState('30% nuo pajamų');

  const [costsIncurred, setCostsIncurred] = useState<string>('');
  const [calculatedCostsIncurred, setCalculatedCostsIncurred] =
    useState<string>('');

  const [paidVSD, setPaidVSD] = useState<string>('');
  const [paidPSD, setPaidPSD] = useState<string>('');

  //   const [taxableIncome, setTaxableIncome] = useState<number>(0);
  //   const [contributionBase, setContributionBase] = useState<number>(0);

  const [savingAdditional, setSavingAdditional] = useState<string>('Ne');

  useEffect(() => {
    calculateOutputs();
  }, [income, costsIncurred, selectedCostCalculation, savingAdditional]);

  const calculateOutputs = () => {
    const parsedIncome = parseFloat(income);
    //console.log(`parsedIncome ${parsedIncome}`);

    let calculatedCostsIncurred;

    //console.log(`selectedCostCalculation ${selectedCostCalculation}`);

    if (selectedCostCalculation === '30% nuo pajamų') {
      calculatedCostsIncurred = (parsedIncome * 0.3).toFixed(2);
    } else {
      calculatedCostsIncurred = parseFloat(costsIncurred).toFixed(2);
    }

    //console.log(`costsIncurred ${costsIncurred}`);
    //console.log(`calculatedCostsIncurred ${calculatedCostsIncurred}`);

    setIncomeReceived(parsedIncome.toFixed(2));
    setCalculatedCostsIncurred(calculatedCostsIncurred);
  };

  const handleCostCalculationChange = (value: string) => {
    console.log('Selected cost calculation:', value);
    setSelectedCostCalculation(value);
  };

  const handleSavingAdditionalChange = (value: string) => {
    console.log('Selected saving additional:', value);
    setSavingAdditional(value);
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
              <p>Gautos pajamos: {incomeReceived}</p>
              <p>Patirtos sąnaudos: {calculatedCostsIncurred}</p>
              <p>Pajamų mokestis: </p>
              <p>
                „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                įmokos)
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default IndividActivTaxCalcualtor;
