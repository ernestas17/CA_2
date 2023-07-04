// https://bulma.io/documentation/form/select/
// https://bulma.io/documentation/components/dropdown/

import { styled } from 'styled-components';

export const StyledSelectBox = styled.div<{
  $isActive: boolean;
  $isRight?: boolean;
  $isUp?: boolean;
  $isRounded?: boolean;
  $isSmall?: boolean;
  $isMedium?: boolean;
  $isLarge?: boolean;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  position: relative;
  vertical-align: top;

  width: ${(props) => (props.$fullWidth ? '100%' : 'initial')};

  /* TODO: move button style to another reusable component */
  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.5em - 1px);
    padding-left: calc(0.75em - 1px);
    padding-right: calc(0.75em - 1px);
    padding-top: calc(0.5em - 1px);
    position: relative;
    vertical-align: top;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    background-color: white;
    border-color: #dbdbdb;
    border-width: 1px;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-bottom: calc(0.5em - 1px);
    padding-left: 1em;
    padding-right: 1em;
    padding-top: calc(0.5em - 1px);
    text-align: center;
    white-space: nowrap;

    border-radius: ${(props) => (props.$isRounded ? '9999px' : '4px')};
    font-size: ${(props) =>
      props.$isSmall
        ? '0.75rem'
        : props.$isMedium
        ? '1.25rem'
        : props.$isLarge
        ? '1.5rem'
        : '1rem'};

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      border-color: #b5b5b5;
      color: #363636;
    }

    &:focus {
      border-color: #485fc7;
      color: #363636;
    }

    &:focus:not(:active) {
      box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
    }

    &:active {
      border-color: #4a4a4a;
      color: #363636;
    }

    .icon {
      height: 1.5em;
      width: 1.5em;
    }

    .icon:first-child:not(:last-child) {
      margin-left: calc(-0.5em - 1px);
      margin-right: 0.25em;
    }

    .icon:last-child:not(:first-child) {
      margin-left: 0.25em;
      margin-right: calc(-0.5em - 1px);
    }

    .icon:first-child:last-child {
      margin-left: calc(-0.5em - 1px);
      margin-right: calc(-0.5em - 1px);
    }
  }

  .dropdown-menu {
    left: ${(props) => (props.$isRight ? 'auto' : 'initial')};
    right: ${(props) => (props.$isRight ? '0' : 'initial')};

    bottom: ${(props) => (props.$isUp ? '100%' : 'initial')};
    padding-bottom: ${(props) => (props.$isUp ? '4px' : 'initial')};
    padding-top: ${(props) => (props.$isUp ? 'initial' : 'initial')};
    top: ${(props) => (props.$isUp ? 'auto' : '100%')};
  }

  .dropdown-item {
    font-size: ${(props) =>
      props.$isSmall
        ? '0.75rem'
        : props.$isMedium
        ? '1.25rem'
        : props.$isLarge
        ? '1.5rem'
        : '1rem'};
  }

  .dropdown-trigger {
    width: ${(props) => (props.$fullWidth ? '100%' : 'initial')};
  }

  .dropdown-trigger > .button {
    width: ${(props) => (props.$fullWidth ? '100%' : 'initial')};
    justify-content: space-between;
  }
`;

export const StyledSelectDropdown = styled.div<{
  $isActive: boolean;
  $maxRows?: number;
}>`
  display: ${(props) => (props.$isActive ? 'block' : 'none')};
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;

  .dropdown-content {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  max-height: ${(props) =>
    props.$maxRows ? `${2.32 * props.$maxRows}em` : 'initial'};
  overflow-y: auto;
`;

export const StyledSelectItem = styled.li<{ $isActive: boolean }>`
  color: #4a4a4a;
  display: block;
  /* font-size: 0.875rem; */
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;

  cursor: pointer;

  padding-right: 3rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;

  background-color: ${(props) => (props.$isActive ? '#485fc7' : 'initial')};
  color: ${(props) => (props.$isActive ? '#fff' : 'initial')};

  &:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
`;
