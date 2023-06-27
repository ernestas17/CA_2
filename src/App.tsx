import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const AmountInWords = lazy(() => import('./pages/Amount_in_words'));
const CurrencyCalc = lazy(() => import('./pages/Currency_calculator'));
const Home = lazy(() => import('./pages/Home'));
const IndividualActivityTaxCalc = lazy(
  () => import('./pages/Individual_activity_tax_calculator')
);
const VATCalc = lazy(() => import('./pages/VAT_calculator'));
const SalaryTaxCalc = lazy(() => import('./pages/Salary_and_tax_calculator'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      // element: <Layout />, //atkomentuoti kai bus Layout
      children: [
        { index: true, element: <Home /> },
        { path: 'amount-in-words', element: <AmountInWords /> },
        { path: 'currency-calculator', element: <CurrencyCalc /> },
        {
          path: 'individual-activity-tax-calculator',
          element: <IndividualActivityTaxCalc />,
        },
        { path: 'PVM-calculator', element: <VATCalc /> },
        { path: 'salary-and-tax-calculator', element: <SalaryTaxCalc /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
