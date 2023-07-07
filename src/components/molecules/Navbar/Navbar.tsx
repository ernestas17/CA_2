import { ReactNode, useEffect, useRef, useState } from 'react';
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
      className='navbar-burger'
      $isActive={isActive}
      onClick={onClick}
    >
      <i className={`fa-solid fa-${isActive ? 'xmark' : 'bars'}`}></i>
    </StyledBurger>
  );
}

export default function Navbar({ children }: { children: ReactNode }) {
  const navbarMenuRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (isActive) {
      navbarMenuRef.current?.classList.add('is-active');
      navbarMenuRef.current?.focus();
    } else {
      navbarMenuRef.current?.classList.remove('is-active');
    }
  }, [isActive, navbarMenuRef]);

  return (
    <StyledNav className='navbar'>
      <div className='navbar-brand'>
        <NavbarBurger
          isActive={isActive}
          onClick={() => setIsActive((prev) => !prev)}
        ></NavbarBurger>
      </div>
      <div
        className='navbar-menu'
        ref={navbarMenuRef}
        tabIndex={0}
        onBlur={() => setIsActive(false)}
      >
        <div className='navbar-start'>{children}</div>
      </div>
    </StyledNav>
  );
}
