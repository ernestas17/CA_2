import { useState } from 'react';
import Input from '../../atoms/Input';
import CounterContentContainer from '../../molecules/CounterContentContainer';
import { StyledFieldWithLabel } from '../../molecules/CounterContentContainer/styles';

const singleDigits: string[] = [
  '',
  'vienas',
  'du',
  'trys',
  'keturi',
  'penki',
  'šeši',
  'septyni',
  'aštuoni',
  'devyni',
  'dešimt',
  'vienuolika',
  'dvylika',
  'trylika',
  'keturiolika',
  'penkiolika',
  'šešiolika',
  'septyniolika',
  'aštuoniolika',
  'devyniolika',
];
const tensDigits: string[] = [
  '',
  'dešimt',
  'dvidešimt',
  'trisdešimt',
  'keturiasdešimt',
  'penkiasdešimt',
  'šešiasdešimt',
  'septyniasdešimt',
  'aštuoniasdešimt',
  'devyniasdešimt',
];
const scaleNamesPlural: string[] = [
  '',
  'tūkstančiai',
  'milijonai',
  'bilijonai',
  'trilijonai',
];

const scaleNamesSingular: string[] = [
  '',
  'tūkstantis',
  'milijonas',
  'bilijonas',
  'trilijonas',
];

const scaleNamesPluralFull: string[] = [
  '',
  'tūkstančių',
  'milijonų',
  'bilijonų',
  'trilijonų',
];

// 10 000, 100 000 ir pan nedarašo scaleName.
// 10 - 20 turi rašyti "tūkstančiai", ten kur vienetu baigiasi tūkstančiai ar šimtai ar ir pan, turi būti vienaiskaitos galūnė

// const hundreds: number = number % 1000; // 1485 - 485
// const tens: number = hundreds % 100; // 1485 - 85
// const digit: number = Math.floor(hundreds / 100); // 1485 - 4
// const tensDigit: number = Math.floor(tens / 10); // 1485 - 8
// const onesDigit: number = tens % 10; // 1485 - 5

function convertToWords(number: number): string {
  if (number === 0) {
    return 'Įveskite sumą ir ji bus paversta žodžiais.';
  }

  let words = '';
  let scaleIndex = 0;

  while (number > 0) {
    const hundreds: number = number % 1000; // takes last 3 digits

    if (
      hundreds !== 0 ||
      (number >= 1000 && !(number % Math.pow(1000, scaleIndex - 1) === 0))
    ) {
      const digit: number = Math.floor(hundreds / 100); // third digit from right
      const tens: number = hundreds % 100; // two rightmost digits

      let scaleName = '';
      let scaleWords = '';

      if (digit !== 0) {
        scaleWords += `${digit === 1 ? '' : singleDigits[digit]} ${
          digit === 1 ? 'šimtas' : 'šimtai'
        }`;
      }

      if (tens >= 11 && tens <= 19) {
        scaleWords += ` ${singleDigits[tens]}`;
        scaleName = scaleNamesPluralFull[scaleIndex];
      } else {
        const tensDigit: number = Math.floor(tens / 10);
        const onesDigit: number = tens % 10;

        if (
          !(scaleIndex > 0 && onesDigit === 1 && tensDigit === 0 && digit === 0)
        ) {
          if (tensDigit !== 0) {
            scaleWords += ` ${tensDigits[tensDigit]}`;
          }

          if (onesDigit !== 0 && tensDigit !== 1) {
            scaleWords += ` ${singleDigits[onesDigit]}`;
          }
        }

        scaleName =
          onesDigit === 1
            ? scaleNamesSingular[scaleIndex]
            : onesDigit === 0
            ? scaleNamesPluralFull[scaleIndex]
            : scaleNamesPlural[scaleIndex];
      }
      if (words !== '' || scaleName !== '') {
        words = `${scaleWords} ${scaleName} ${words}`;
      } else {
        words = scaleWords;
      }
    }

    number = Math.floor(number / 1000); //removes last 3 digits, so next iteration the number will be treated as not having them (ex. 87654321 -> 87654)
    scaleIndex++;
  }

  return words.trim();
}

function AmountInWordsLogic() {
  const [number, setNumber] = useState<string>('');

  return (
    <CounterContentContainer
      useBuiltInStyle
      inputs={

          <StyledFieldWithLabel>
            <label className='boldLabel'>Įveskite sumą</label>
            <Input
              type='text'
              value={number}
              setvalue={setNumber}
              width={250}
              placeholder='0'
            />
          </StyledFieldWithLabel>

      }
      outputs={
        <StyledFieldWithLabel>
          <p>{convertToWords(Number(number))}</p>
        </StyledFieldWithLabel>
      }
    />
  );
}

export default AmountInWordsLogic;
