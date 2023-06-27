import { ReactNode, Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

const AmountInWords = lazy(() => import('./pages/Amount_in_words'));
const CurrencyCalc = lazy(() => import('./pages/Currency_calculator'));
const Home = lazy(() => import('./pages/Home'));
const IndividualActivityTaxCalc = lazy(
  () => import('./pages/Individual_activity_tax_calculator')
);
const VATCalc = lazy(() => import('./pages/VAT_calculator'));
const SalaryTaxCalc = lazy(() => import('./pages/Salary_and_tax_calculator'));

//GV: is this the right place? Maybe move to '/shared/'?
interface IAppRoute {
  title: string;
  includeInNav?: boolean;
  routerParams: {
    element: ReactNode;
    index?: boolean;
    path?: string;
  };
}

export const APP_ROUTES: IAppRoute[] = [
  {
    title: 'Pagrindinis',
    includeInNav: true,
    routerParams: { index: true, element: <Home /> },
  },
  {
    title: 'Atlyginimo ir mokesčIų skaičiuoklė',
    includeInNav: true,
    routerParams: {
      path: 'salary-and-tax-calculator',
      element: <SalaryTaxCalc />,
    },
  },
  {
    title: 'Individualios veiklos mokesčių skaičiuoklė',
    includeInNav: true,
    routerParams: {
      path: 'individual-activity-tax-calculator',
      element: <IndividualActivityTaxCalc />,
    },
  },
  {
    title: 'PVM skaičiuoklė',
    includeInNav: true,
    routerParams: { path: 'PVM-calculator', element: <VATCalc /> },
  },
  {
    title: 'Valiutų skaičiuoklė',
    includeInNav: true,
    routerParams: { path: 'currency-calculator', element: <CurrencyCalc /> },
  },
  {
    title: 'Suma žodžiais',
    includeInNav: true,
    routerParams: { path: 'amount-in-words', element: <AmountInWords /> },
  },
];

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: APP_ROUTES.map((route) => {
        // https://stackoverflow.com/q/72167518
        return {
          ...route.routerParams,
          element: (
            <Suspense fallback={<span>loading...</span>}>
              {route.routerParams.element}
            </Suspense>
          ),
        };
      }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
