import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledNav = styled.nav`
  min-height: 3.25rem;
  position: relative;
  z-index: 30;

  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: white;
      box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
      padding: 0.5rem 0;
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 3.25rem;

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
