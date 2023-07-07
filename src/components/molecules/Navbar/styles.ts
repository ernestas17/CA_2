import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledNav = styled.nav`
  min-height: 3.25rem;
  position: relative;
  z-index: 30;

  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);

  .navbar-menu {
    display: none;
  }

  .navbar-brand {
    align-items: stretch;
    display: flex;
    flex-shrink: 0;
    min-height: 3.25rem;

    margin-left: -0.75rem;

    color: rgba(0, 0, 0, 0.7);
  }

  .navbar-burger {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    color: currentColor;
    font-family: inherit;
    font-size: 1em;
    margin: 0;
    padding: 0;

    color: rgba(0, 0, 0, 0.7);

    color: #4a4a4a;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    display: block;
    height: 3.25rem;
    position: relative;
    width: 3.25rem;
    margin-left: auto;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    span {
      background-color: currentColor;
      display: block;
      height: 1px;
      left: calc(50% - 8px);
      position: absolute;
      transform-origin: center;
      transition-duration: 86ms;
      transition-property: background-color, opacity, transform;
      transition-timing-function: ease-out;
      width: 16px;

      &:nth-child(1) {
        top: calc(50% - 6px);
      }

      &:nth-child(2) {
        top: calc(50% - 1px);
      }

      &:nth-child(3) {
        top: calc(50% + 4px);
      }
    }

    &.is-active {
      span {
        &:nth-child(1) {
          transform: translateY(5px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(-5px) rotate(-45deg);
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: white;
      box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
      padding: 0.5rem 0;

      &.is-active {
        display: block;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    align-items: stretch;
    display: flex;

    .navbar-menu,
    .navbar-start,
    .navbar-end {
      align-items: stretch;
      display: flex;
    }

    .navbar-menu {
      flex-grow: 1;
      flex-shrink: 0;
    }
    .navbar-start {
      justify-content: flex-start;
      margin-right: auto;
    }
    .navbar-end {
      justify-content: flex-end;
      margin-left: auto;
    }

    .navbar-burger {
      display: none;
    }
  }

  /* deviating from Bulma standard */

  justify-content: center;

  .navbar-menu {
    flex-grow: 0;

    &:focus {
      outline: none;
    }
  }

  .navbar-menu,
  .navbar-start,
  .navbar-end {
    flex-shrink: 1;
    flex-wrap: wrap;
  }
`;

export const StyledLink = styled(Link)`
  color: #4a4a4a;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;

  flex-grow: 0;
  flex-shrink: 0;

  cursor: pointer;

  &:focus,
  &:focus-within,
  &:hover,
  &.is-active {
    background-color: #fafafa;
    color: #485fc7;
  }

  img {
    max-height: 1.75rem;
  }

  .icon:only-child {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }

  @media screen and (min-width: 1024px) {
    align-items: center;
    display: flex;
  }
`;

export const StyledBurger = styled.a<{ $isActive: boolean }>``;
