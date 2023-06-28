import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function NavbarItem({ path, text }: { path: string; text: string }) {
  return (
    <Link className='navbar-item' to={path}>
      {text}
    </Link>
  );
}

export default function Navbar({ children }: { children: ReactNode }) {
  return <nav className='navbar'>{children}</nav>;
}
