import { useState } from "react";
import Input from "../../atoms/Input";
import Select from "../../atoms/Select";
import CounterContentContainer from "../../molecules/CounterContentContainer";
import { SelectItem, ValidValueType } from "../../atoms/Select/Select";
import {
  StyledVatContentContainer,
  StyledVatInputsContainer,
  StyledVatOutputsContainer,
  StyledVatContentBox,
} from "./styles";

const Vat_calc = () => {
  const [SumValueNoVat, setSumValueNoVat] = useState("");
  const [AllSumValueWithVat, setAllSumValueWithVat] = useState("");
  const [selectedVal, setSelectedVal] = useState<ValidValueType>(null);

  const handleSumValueNoVatChange = (value: string) => {
    setSumValueNoVat(value);
    setAllSumValueWithVat("");
  };

  const handleAllSumValueWithVatChange = (value: string) => {
    setAllSumValueWithVat(value);
    setSumValueNoVat("");
  };

  const parseNumber = (value: string) => {
    // Replace commas with dots before parsing the number
    const cleanedValue = value.replace(",", ".");
    return parseFloat(cleanedValue);
  };

  const calculateTaxableAmount = () => {
    if (AllSumValueWithVat && typeof selectedVal === "number") {
      const vatRate = selectedVal / 100;
      const taxableAmount = parseNumber(AllSumValueWithVat) / (1 + vatRate);
      return taxableAmount.toFixed(2);
    } else if (SumValueNoVat) {
      return SumValueNoVat;
    }
    return "";
  };

  const calculateVAT = () => {
    if (AllSumValueWithVat && typeof selectedVal === "number") {
      const vatRate = selectedVal / 100;
      const taxableAmount = parseNumber(AllSumValueWithVat) / (1 + vatRate);
      const vat = taxableAmount * vatRate;
      return vat.toFixed(2);
    } else if (SumValueNoVat) {
      const vatRate = typeof selectedVal === "number" ? selectedVal / 100 : 0;
      const vat = parseNumber(SumValueNoVat) * vatRate;
      return vat.toFixed(2);
    }
    return "";
  };

  const calculateTotalPrice = () => {
    if (SumValueNoVat && typeof selectedVal === "number") {
      const vatRate = selectedVal / 100;
      const taxableAmount = parseNumber(SumValueNoVat);
      const vat = taxableAmount * vatRate;
      const totalPrice = taxableAmount + vat;
      return totalPrice.toFixed(2);
    } else if (AllSumValueWithVat && typeof selectedVal === "number") {
      const totalPrice = parseNumber(AllSumValueWithVat);
      return totalPrice.toFixed(2);
    }
    return "";
  };

  return (
    <StyledVatContentContainer>
      <h1>PVM Skaičiuoklė</h1>
      <CounterContentContainer
        inputs={
          <StyledVatInputsContainer>
            <StyledVatContentBox>
              <label>PVM tarifas</label>
              <Select setvalue={setSelectedVal}>
                <SelectItem value={21}>21%</SelectItem>
                <SelectItem value={9}>9%</SelectItem>
                <SelectItem value={5}>5%</SelectItem>
              </Select>
            </StyledVatContentBox>
            <StyledVatContentBox>
              <label>Suma (be PVM)</label>
              <Input
                type="text"
                value={SumValueNoVat}
                setvalue={handleSumValueNoVatChange}
                placeholder="0"
                width={150}
              />
            </StyledVatContentBox>
            <StyledVatContentBox>
              <label>Bendra suma (su PVM)</label>
              <Input
                type="text"
                value={AllSumValueWithVat}
                setvalue={handleAllSumValueWithVatChange}
                placeholder="0"
                width={150}
              />
            </StyledVatContentBox>
          </StyledVatInputsContainer>
        }
        outputs={
          <StyledVatOutputsContainer>
            <StyledVatContentBox>
              <label>Suma (be PVM)</label>
              <p>{calculateTaxableAmount()}</p>
            </StyledVatContentBox>
            <StyledVatContentBox>
              <label>PVM suma</label>
              <p>{calculateVAT()}</p>
            </StyledVatContentBox>
            <StyledVatContentBox>
              <label>Bendra suma (su PVM)</label>
              <p>{calculateTotalPrice()}</p>
            </StyledVatContentBox>
          </StyledVatOutputsContainer>
        }
      />
    </StyledVatContentContainer>
  );
};

export default Vat_calc;
