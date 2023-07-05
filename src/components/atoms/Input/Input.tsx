import React, { useEffect, useRef, ChangeEvent, useState } from 'react';
import { StyledInputWrapper, StyledInput } from './styles';

interface IInputProps {
  type: 'text' | 'number';
  value: string | number;
  setvalue: (value: string) => void;
  placeholder?: string;
  width?: number;
}

const Input = ({ type, value, setvalue, placeholder, width }: IInputProps) => {
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string | number>(value);

  useEffect(() => {
    const handleOutsideInputClick = (e: MouseEvent) => {
      if (!inputWrapperRef.current?.contains(e.target as Node)) {
        inputWrapperRef.current!.style.boxShadow = 'none';
        inputWrapperRef.current!.style.borderColor = '';
      }
    };

    document.addEventListener('click', handleOutsideInputClick);
    return () => {
      document.removeEventListener('click', handleOutsideInputClick);
    };
  }, []);

  const handleClick = () => {
    inputWrapperRef.current!.style.boxShadow = `0px 0px 4px 0.125px rgb(103, 159, 241)`;
    inputWrapperRef.current!.style.borderColor = 'rgb(103, 159, 241)';
    inputRef.current!.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Validating input to accept only numbers, commas and dots, and limit length
    const maxLength = 10;
    const numericValue = inputValue
      .replace(/[^0-9.,]/g, '')
      .slice(0, maxLength);
    setInputValue(numericValue);
    setvalue(numericValue);
  };

  const inputWrapperWidth = width ? { width: width } : {};

  return (
    <StyledInputWrapper
      ref={inputWrapperRef}
      onClick={handleClick}
      style={inputWrapperWidth}
    >
      <StyledInput
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ''}
      />
    </StyledInputWrapper>
  );
};

export default Input;

// example how to insert Input:
// const [Value, setValue] = useState("");
// <Input type="text" value={Value} setvalue={setValue} placeholder="Salary" width={300} />
