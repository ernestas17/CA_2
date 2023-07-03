import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout() {
  //TODO: must adhere to Bulma layout
  return (
    <>
      <Header />
      <main className='section'>
        {/* Outlet is where the children nodes defined in Routes "element" will go depending on path */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
