import CardContainer from "../../components/molecules/CardContainer";
import { CardItem } from "../../components/molecules/CardContainer/CardContainer";

const Home = () => {
  return (
    <section>
      <CardContainer>
        <CardItem
          path="/salary-and-tax-calculator"
          text="Atlyginimo ir mokesčIų skaičiuoklė"
        />
        <CardItem
          path="/individual-activity-tax-calculator"
          text="Individualios veiklos mokesčių skaičiuoklė"
        />
        <CardItem path="/PVM-calculator" text="PVM skaičiuoklė" />
        <CardItem path="/currency-calculator" text="Valiutų skaičiuoklė" />
        <CardItem path="/amount-in-words" text="Suma žodžiais" />
      </CardContainer>
    </section>
  );
};

export default Home;
