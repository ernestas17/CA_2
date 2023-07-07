import { ReactNode, useRef, useState } from 'react';
import { StyledNav, StyledLink, StyledBurger } from './styles';

export function NavbarItem({ path, text }: { path: string; text: string }) {
  return (
    <StyledLink className='navbar-item' to={path}>
      {text}
    </StyledLink>
  );
}

function NavbarBurger({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <StyledBurger
      className={`navbar-burger${isActive ? ' is-active' : ''}`}
      $isActive={isActive}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </StyledBurger>
  );
}

export default function Navbar({ children }: { children: ReactNode }) {
  const navbarMenuRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <StyledNav className='navbar'>
      <div className='navbar-brand'>
        <NavbarBurger
          isActive={isActive}
          onClick={() => {
            setIsActive((prev) => {
              if (!prev) {
                navbarMenuRef.current?.focus(); //not working, and really not needed according to Bulma standard?
              }
              return !prev;
            });
          }}
        />
      </div>
      <div
        className={`navbar-menu${isActive ? ' is-active' : ''}`}
        ref={navbarMenuRef}
        tabIndex={0}
        onBlur={() => setIsActive(false)}
      >
        <div className='navbar-start'>{children}</div>
      </div>
    </StyledNav>
  );
}
