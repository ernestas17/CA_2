import { useState, useEffect } from 'react';
import Input from '../../atoms/Input';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import { RadioItem } from '../../atoms/Radio/Radio';
import { StyledFieldWithLabel } from '../../molecules/CounterContentContainer/styles';
import {
  SyledRadioWithLabel,
  SyledRadioWrapper,
  StyledOutputContainer,
  StyledTitleRow,
} from '../IndividualActivityTaxCalculator/styles';

import { StyledFieldWithLabelContainer } from './styles';

interface CalculatedSalaryDetails {
  bruttoSalary: number;
  npd: number;
  gpm: number;
  sodra1: number;
  sodra2: number;
  nettosalary: number;
  sodraEmpl: number;
  workplaceCost: number;
}

const Salary_Tax_Calc = () => {
  const [Value1, setValue1] = useState('');
  const [Value2, setValue2] = useState('');
  const [salaryType, setSalaryType] = useState('ant popieriaus');
  const [npdType, setNpdType] = useState('');
  const [pensionType, setPensionType] = useState('');

  const [calculatedSalaryDetails, setCalculatedSalaryDetails] =
    useState<CalculatedSalaryDetails>({
      bruttoSalary: 0,
      npd: 0,
      gpm: 0,
      sodra1: 0,
      sodra2: 0,
      nettosalary: 0,
      sodraEmpl: 0,
      workplaceCost: 0,
    });

  useEffect(() => {
    calculateTaxes(getOutputValue(), salaryType, npdType, pensionType);
  }, [Value1, Value2, salaryType, npdType, pensionType]);

  const calculateTaxes = (
    salary: number,
    salaryType: string,
    npdType: string,
    pensionType: string
  ) => {
    let bruttoSalary: number = 0;
    let npd: number = 0;
    let gpm: number = 0;
    let sodra1: number = 0;
    let sodra2: number = 0;
    let nettosalary: number = 0;
    let sodraEmpl: number = 0;
    let workplaceCost: number = 0;

    if (salaryType === 'į rankas' && pensionType === 'nekaupiu') {
      if (1 <= salary && salary <= 503.12) {
        bruttoSalary = Number((salary / 0.805).toFixed(2));
      } else if (503.13 <= salary && salary <= 633.2) {
        bruttoSalary = Number(((salary - 125) / 0.605).toFixed(2));
      } else if (633.21 <= salary && salary <= 1199.01) {
        bruttoSalary = Number(((salary - 195.56) / 0.521).toFixed(2));
      } else if (1199.02 <= salary && salary <= 1732) {
        bruttoSalary = Number(((salary - 103.112) / 0.569).toFixed(2));
      } else if (salary >= 1732) {
        bruttoSalary = Number((salary / 0.605).toFixed(2));
      }

      if (npdType === 'paskaičiuos sistema' && bruttoSalary < 840) {
        npd = bruttoSalary;
        npd = npd > 625 ? 625 : npd;
      } else if (
        npdType === 'paskaičiuos sistema' &&
        840 <= bruttoSalary &&
        bruttoSalary <= 1926
      ) {
        npd = Number((625 - 0.42 * (bruttoSalary - 840)).toFixed(2));
      } else if (npdType === 'paskaičiuos sistema' && bruttoSalary > 1926) {
        npd = Number((400 - 0.18 * (bruttoSalary - 642)).toFixed(2));
        npd = npd < 0 ? 0 : npd;
        npd = npd > 625 ? 625 : npd;
      } else if (npdType === 'netaikyti NPD') {
        npd = 0.0;
      }

      sodra1 = bruttoSalary * 0.0698;
      if (salaryType === 'į rankas' && pensionType === 'nekaupiu') {
        sodra2 = bruttoSalary * 0.1252;
      }

      gpm = (bruttoSalary - npd) * 0.2;
      nettosalary = bruttoSalary - gpm - sodra1 - sodra2;
      sodraEmpl = bruttoSalary * 0.0177;
      workplaceCost = bruttoSalary + sodraEmpl;
    } else if (salaryType === 'į rankas' && pensionType === 'kaupiu') {
      if (1 <= salary && salary <= 484.37) {
        bruttoSalary = Number((salary / 0.775).toFixed(2));
      } else if (484.38 <= salary && salary <= 608) {
        bruttoSalary = Number(((salary - 125) / 0.575).toFixed(2));
      } else if (608.01 <= salary && salary <= 1141.23) {
        bruttoSalary = Number(((salary - 195.56) / 0.491).toFixed(2));
      } else if (1141.24 <= salary && salary <= 1647) {
        bruttoSalary = Number(((salary - 103.112) / 0.539).toFixed(2));
      } else if (salary > 1647) {
        bruttoSalary = Number((salary / 0.575).toFixed(2));
      }

      if (npdType === 'paskaičiuos sistema' && bruttoSalary < 840) {
        npd = bruttoSalary;
        npd = npd > 625 ? 625 : npd;
      } else if (
        npdType === 'paskaičiuos sistema' &&
        840 <= bruttoSalary &&
        bruttoSalary <= 1926
      ) {
        npd = Number((625 - 0.42 * (bruttoSalary - 840)).toFixed(2));
      } else if (npdType === 'paskaičiuos sistema' && bruttoSalary > 1926) {
        npd = Number((400 - 0.18 * (bruttoSalary - 642)).toFixed(2));
        npd = npd < 0 ? 0 : npd;
        npd = npd > 625 ? 625 : npd;
      } else if (npdType === 'netaikyti NPD') {
        npd = 0.0;
      }

      sodra1 = bruttoSalary * 0.0698;
      if (salaryType === 'į rankas' && pensionType === 'kaupiu') {
        sodra2 = bruttoSalary * 0.1552;
      }

      gpm = (bruttoSalary - npd) * 0.2;
      nettosalary = bruttoSalary - gpm - sodra1 - sodra2;
      sodraEmpl = bruttoSalary * 0.0177;
      workplaceCost = bruttoSalary + sodraEmpl;
    } else if (salaryType === 'ant popieriaus') {
      if (npdType === 'paskaičiuos sistema' && salary < 840) {
        npd = salary;
        npd = npd > 625 ? 625 : npd;
      } else if (
        npdType === 'paskaičiuos sistema' &&
        840 <= salary &&
        salary <= 1926
      ) {
        npd = Number((625 - 0.42 * (salary - 840)).toFixed(2));
      } else if (npdType === 'paskaičiuos sistema' && salary > 1926) {
        npd = Number((400 - 0.18 * (salary - 642)).toFixed(2));
        npd = npd < 0 ? 0 : npd;
        npd = npd > 625 ? 625 : npd;
      } else if (npdType === 'netaikyt NPD') {
        npd = 0.0;
      }

      sodra1 = salary * 0.0698;

      if (pensionType === 'nekaupiu') {
        sodra2 = salary * 0.1252;
      } else {
        sodra2 = salary * 0.1552;
      }

      gpm = (salary - npd) * 0.2;
      nettosalary = salary - gpm - sodra1 - sodra2;
      sodraEmpl = salary * 0.0177;
      workplaceCost = parseFloat(getOutputValue()) + sodraEmpl;
    }
    setCalculatedSalaryDetails({
      bruttoSalary,
      npd,
      gpm,
      sodra1,
      sodra2,
      nettosalary,
      sodraEmpl,
      workplaceCost,
    });
  };

  const handleSalaryTypeChange = (value: string) => {
    setSalaryType(value);
  };

  const handleNpdTypeChange = (value: string) => {
    setNpdType(value);
  };

  const handleForPensionTypeChange = (value: string) => {
    setPensionType(value);
  };

  const getOutputValue = () => {
    if (salaryType === 'ant popieriaus') {
      return Value1;
    } else if (salaryType === 'į rankas') {
      return Value2;
    }

    return '';
  };

  const getNumberOrZero = (value: string | number): number => {
    if (value === '' || isNaN(Number.parseFloat(value))) {
      return 0.0;
    }
    return parseFloat(value);
  };

  return (
    <CounterContentContainer
      useBuiltInStyle
      inputs={
        <>
          <StyledFieldWithLabel className='boldLabel'>
            <label>Skaičiuoja už 2023 m.</label>
          </StyledFieldWithLabel>
          <SyledRadioWithLabel>
            <label className='boldLabel'>Atlyginimas</label>
            <SyledRadioWrapper>
              <RadioItem
                label='ant popieriaus'
                name='salaryType'
                checked={salaryType === 'ant popieriaus'}
                onChange={handleSalaryTypeChange}
                value='ant popieriaus'
              />
              <RadioItem
                label='į rankas'
                name='salaryType'
                checked={salaryType === 'į rankas'}
                onChange={handleSalaryTypeChange}
                value='į rankas'
              />
            </SyledRadioWrapper>
          </SyledRadioWithLabel>
          <StyledFieldWithLabel>
            <label className='boldLabel'>
              {salaryType === 'ant popieriaus'
                ? '"Ant popieriaus"'
                : '"Į rankas"'}
            </label>
            {salaryType === 'ant popieriaus' ? (
              <Input
                type='text'
                value={Value1}
                setvalue={setValue1}
                placeholder='0'
                width={250}
              />
            ) : (
              <Input
                type='text'
                value={Value2}
                setvalue={setValue2}
                placeholder='0'
                width={250}
              />
            )}
          </StyledFieldWithLabel>

          <SyledRadioWithLabel>
            <label className='boldLabel'>Kaip skaičiuoti NPD?</label>
            <SyledRadioWrapper>
              <RadioItem
                label='paskaičiuos sistema'
                name='npdCalculationType'
                checked={npdType === 'paskaičiuos sistema'}
                onChange={handleNpdTypeChange}
                value='paskaičiuos sistema'
              />
              <RadioItem
                label='netaikyti NPD'
                name='npdCalculationType'
                checked={npdType === 'netaikyti NPD'}
                onChange={handleNpdTypeChange}
                value='netaikyti NPD'
              />
            </SyledRadioWrapper>
          </SyledRadioWithLabel>
          <SyledRadioWithLabel>
            <label className='boldLabel'>Kaupiu pensijai papildomai 3%</label>
            <SyledRadioWrapper>
              <RadioItem
                label='kaupiu'
                name='pensionCalculationType'
                checked={pensionType === 'kaupiu'}
                onChange={handleForPensionTypeChange}
                value='kaupiu'
              />
              <RadioItem
                label='nekaupiu'
                name='pensionCalculationType'
                checked={pensionType === 'nekaupiu'}
                onChange={handleForPensionTypeChange}
                value='nekaupiu'
              />
            </SyledRadioWrapper>
          </SyledRadioWithLabel>
        </>
      }
      outputs={
        <>
          <StyledFieldWithLabel>
            <label>Priskaičiuotas atlyginimas "ant popieriaus"</label>
            <p>
              {salaryType === 'ant popieriaus'
                ? ` ${
                    getNumberOrZero(getOutputValue()) &&
                    parseFloat(getOutputValue()).toFixed(2)
                  }`
                : ` ${
                    getNumberOrZero(calculatedSalaryDetails.bruttoSalary) &&
                    calculatedSalaryDetails.bruttoSalary.toFixed(2)
                  }`}
            </p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Pritaikytas NPD</label>
            <p>{calculatedSalaryDetails.npd}</p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Pajamų mokestis 20 %</label>
            <p>
              {getNumberOrZero(calculatedSalaryDetails.gpm) &&
                calculatedSalaryDetails.gpm.toFixed(2)}
            </p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Sodra. Sveikatos draudimas 6.98 %</label>
            <p>
              {getNumberOrZero(calculatedSalaryDetails.sodra1) &&
                calculatedSalaryDetails.sodra1.toFixed(2)}
            </p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>
              Sodra. Pensijų ir soc. draudimas
              {pensionType === 'nekaupiu' ? ` 12.52 %` : ` 15.52 %`}
            </label>
            <p>
              {getNumberOrZero(calculatedSalaryDetails.sodra2) &&
                calculatedSalaryDetails.sodra2.toFixed(2)}
            </p>
          </StyledFieldWithLabel>
          <StyledFieldWithLabel>
            <label>Išmokamas atlyginimas "į rankas"</label>
            <p>
              {getNumberOrZero(calculatedSalaryDetails.nettosalary) &&
                calculatedSalaryDetails.nettosalary.toFixed(2)}
            </p>
          </StyledFieldWithLabel>
          <StyledOutputContainer>
            <StyledTitleRow>Darbdavio sumokami mokesčiai:</StyledTitleRow>

            <StyledFieldWithLabel>
              <label>Sodra 1.77 %</label>
              <p>
                {getNumberOrZero(calculatedSalaryDetails.sodraEmpl) &&
                  calculatedSalaryDetails.sodraEmpl.toFixed(2)}
              </p>
            </StyledFieldWithLabel>

            <StyledFieldWithLabel>
              <label>Visa darbo vietos kaina</label>
              <p>
                {getNumberOrZero(calculatedSalaryDetails.workplaceCost) &&
                  calculatedSalaryDetails.workplaceCost.toFixed(2)}
              </p>
            </StyledFieldWithLabel>
          </StyledOutputContainer>
        </>
      }
    ></CounterContentContainer>
  );
};

export default Salary_Tax_Calc;
