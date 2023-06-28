import { ReactNode } from 'react';
import { StyledNav, StyledLink } from './styles';

export function NavbarItem({ path, text }: { path: string; text: string }) {
  return (
    <StyledLink className='navbar-item' to={path}>
      {text}
    </StyledLink>
  );
}

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <StyledNav className='navbar'>
      <div className='navbar-menu'>
        <div className='navbar-start'>{children}</div>
      </div>
    </StyledNav>
  );
}
