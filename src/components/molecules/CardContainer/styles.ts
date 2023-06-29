import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const StyledCard = styled(Link)`
  width: 191px;
  height: 253px;
  display: grid;
  text-align: center;
  align-items: center;
  margin: 0.5em;
  /* margin: 52px; */

  box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  color: hsl(0, 0%, 29%);

  transition: 1s;
  cursor: pointer;

  .text-box {
    padding: 1.5rem;
    font-size: 21px;
  }

  .span-box {
    display: none;
    align-self: end;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
    animation: scaling 1s ease;

    &:hover {
      background-color: whitesmoke;
    }
  }
  @keyframes scaling {
    0% {
      font-size: 18px;
      opacity: 0.9;
    }
    100% {
      font-size: 20px;
      opacity: 1;
    }
  }

  &:hover {
    transform: scale(0.95);

    .text-box {
      opacity: 0.5;
      font-size: 19px;
      transition: font-size 1s ease, opacity 1s ease;
    }

    .span-box {
      display: block;
    }
  }
`;

export const StyledCardContainer = styled.section`
  background-color: white;

  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: center;
  align-items: center;
`;
