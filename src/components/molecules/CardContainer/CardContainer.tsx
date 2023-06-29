import { ReactNode } from "react";
import { StyledCard, StyledCardContainer } from "./styles";

export function CardItem({ path, text }: { path: string; text: string }) {
  return (
    <StyledCard to={path}>
      <div className="text-box"> {text}</div>
      <div className="span-box">
        <span>Skaičiuoti</span>
      </div>
    </StyledCard>
  );
}

export function CardContainer({ children }: { children: ReactNode }) {
  return <StyledCardContainer>{children}</StyledCardContainer>;
}
