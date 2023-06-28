import Navbar from '../Navbar';
import { NavbarItem } from '../Navbar/Navbar';

export default function Header() {
  //TODO: useState to indicate selected page

  return (
    <header>
      <Navbar>
        <NavbarItem path='/' text='Pagrindinis' />
        <NavbarItem
          path='/salary-and-tax-calculator'
          text='Atlyginimo ir mokesčIų skaičiuoklė'
        />
        <NavbarItem
          path='/individual-activity-tax-calculator'
          text='Individualios veiklos mokesčių skaičiuoklė'
        />
        <NavbarItem path='/PVM-calculator' text='PVM skaičiuoklė' />
        <NavbarItem path='/currency-calculator' text='Valiutų skaičiuoklė' />
        <NavbarItem path='/amount-in-words' text='Suma žodžiais' />
      </Navbar>
    </header>
  );
}
