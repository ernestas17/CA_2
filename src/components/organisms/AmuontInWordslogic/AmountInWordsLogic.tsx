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
  "šimtas",
  "tūkstantis",
  "milijonas",
  "bilijonas",
  "trilijonas",
];

function convertToWords(number: number): string {
  if (number === 0) {
    return "Įveskite sumą ir ji bus paversta žodžiais.";
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
        if (digit === 1 && tens === 0 && scaleIndex === 0) {
          scaleWords += "šimtas";
        } else if (digit === 1 && tens === 0 && scaleIndex === 1) {
          scaleWords += "tūkstantis";
        } else if (digit === 1 && tens === 0 && scaleIndex === 2) {
          scaleWords += "milijonas";
        } else if (digit === 1 && tens === 0 && scaleIndex === 3) {
          scaleWords += "bilijonas";
        } else {
          scaleWords += `${singleDigits[digit]} ${getScaleWord(scaleIndex)}`;
        }
        if (scaleName !== "") {
          scaleWords += " ";
        }
      }

      function getScaleWord(scaleIndex: number): string {
        if (scaleIndex === 1) {
          return "šimtai";
        } else if (scaleIndex === 2) {
          return "tūkstančiai";
        } else if (scaleIndex === 3) {
          return "milijonai";
        } else if (scaleIndex === 4) {
          return "bilijonai";
        } else {
          return scaleNames[scaleIndex];
        }
      }

      if (tens >= 11 && tens <= 19) {
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
