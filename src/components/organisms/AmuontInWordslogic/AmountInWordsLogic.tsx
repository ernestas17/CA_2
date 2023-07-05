import { useState } from "react";
import Input from "../../atoms/Input";

const singleDigits: string[] = [
  "",
  "vienas",
  "du",
  "trys",
  "keturi",
  "penki",
  "šeši",
  "septyni",
  "aštuoni",
  "devyni",
  "dešimt",
  "vienuolika",
  "dvylika",
  "trylika",
  "keturiolika",
  "penkiolika",
  "šešiolika",
  "septyniolika",
  "aštuoniolika",
  "devyniolika",
];
const tensDigits: string[] = [
  "",
  "dešimt",
  "dvidešimt",
  "trisdešimt",
  "keturiasdešimt",
  "penkiasdešimt",
  "šešiasdešimt",
  "septyniasdešimt",
  "aštuoniasdešimt",
  "devyniasdešimt",
];
const scaleNames: string[] = [
  "",
  "tūkstančiai",
  "milijonai",
  "bilijonai",
  "trilijonai",
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
    return "Įveskite sumą ir ji bus paversta žodžiais.";
  }

  if (number === 1000) {
    return "tūkstantis";
  }

  if (number > 1000 && number < 2000) {
    const hundreds: number = number % 1000;
    return `tūkstantis ${convertToWords(hundreds)}`;
  }

  let words: string = "";
  let scaleIndex: number = 0;

  while (number > 0) {
    const hundreds: number = number % 1000;

    if (hundreds !== 0) {
      const digit: number = Math.floor(hundreds / 100);
      const tens: number = hundreds % 100;
      const scaleName: string = scaleNames[scaleIndex];

      let scaleWords: string = "";

      if (digit !== 0) {
        scaleWords += `${digit === 1 ? "" : singleDigits[digit]} ${
          digit === 1 ? "šimtas" : "šimtai"
        }`;

        if (scaleName !== "") {
          scaleWords += "";
        }
      }

      if (hundreds === 100 && scaleIndex === 1) {
        scaleWords = "tūkstantis";
      } else if (tens >= 11 && tens <= 19) {
        scaleWords += ` ${singleDigits[tens]}`;
      } else {
        const tensDigit: number = Math.floor(tens / 10);
        const onesDigit: number = tens % 10;

        if (tensDigit !== 0) {
          scaleWords += ` ${tensDigits[tensDigit]}`;
        }

        if (onesDigit !== 0 && tensDigit !== 1) {
          scaleWords += ` ${singleDigits[onesDigit]}`;
        }
      }

      if (words !== "") {
        if (scaleName !== "" && scaleWords.trim() !== "") {
          words = `${scaleWords} ${scaleName} ${words}`;
        } else {
          words = `${scaleWords}${words}`;
        }
      } else {
        words = scaleWords;
      }
    }

    number = Math.floor(number / 1000);
    scaleIndex++;
  }

  return words.trim();
}

function AmountInWordsLogic() {
  const [number, setNumber] = useState<string>("");

  return (
    <div>
      <Input type="text" value={number} setvalue={setNumber} width={200} />
      <p>{convertToWords(Number(number))}</p>
    </div>
  );
}

export default AmountInWordsLogic;
