import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../App';

export default function Navbar() {
  return (
    <nav>
      {APP_ROUTES.filter((route) => route.includeInNav).map((route) => (
        <Link
          key={`nav-${route.routerParams.path}`}
          to={route.routerParams.path ?? (route.routerParams.index ? '/' : '#')}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
}
