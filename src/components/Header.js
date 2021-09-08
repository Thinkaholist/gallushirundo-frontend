import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useWindowSize } from 'react-use';
import { ContainerStyles } from '../styles/ContainerStyles';
import Logo from './Logo';
import HamburgerMenu from './HamurgerMenu';

const menuItems = [
  { name: 'News', path: '/news', color: 'hsl(var(--color-red))' },
  { name: 'Events', path: '/events', color: 'var(--color-matyo-orange)' },
  { name: 'Artists', path: '/artists', color: 'var(--color-matyo-purple)' },
  { name: 'Contact', path: '/contact', color: 'var(--color-matyo-blue)' },
];

const HeaderStyles = styled.header`
  background-color: ${(p) => p.styles.backgroundColor};
  color: ${(p) => (p.pathname === '/' ? 'var(--color-white)' : p.styles.color)};
  padding: ${(p) => (p.width < 917 ? '15px 0' : '10px 0')};
  box-shadow: ${(p) => p.styles.boxShadow};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 400ms ease;
  z-index: 9997;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const HeaderContentWrapper = styled.div`
  text-transform: uppercase;
  font-family: var(--font-family);
  font-weight: 700;
  display: flex;
  align-items: center;

  @media (max-width: 916px) {
    justify-content: center;
  }
`;

const MenuItems = styled.ul`
  font-family: var(--font-family);
  font-weight: 400;
  display: flex;
  gap: 60px;
  margin-left: auto;

  a {
    letter-spacing: 1px;
  }

  a[aria-current='page'] {
    font-family: var(--font-family);
    border-bottom: 2px solid;
    letter-spacing: 0;
    font-weight: 700;
  }

  @media (max-width: 916px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  padding: 0 2px;
  /* test */
  color: ${(p) =>
    p.scrolled || p.pathname === '/' ? `var(--color-white)` : p.color};
`;

const MobileMenu = styled.div`
  background-color: hsl(var(--color-red));
  position: fixed;
  left: 0;
  top: 0;
  width: 80%;
  bottom: 0;
  transform: ${(p) => (!p.isOpen ? 'translateX(-110%)' : 'translateX(0)')};
  transition: all 0.3s ease-in-out;
  text-align: center;
  z-index: 9998;
`;

const MobilMenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: ${(p) => (p.isOpen ? 1 : 0)};
  display: ${(p) => (p.isOpen ? 'block' : 'none')};
  transition: opacity 350ms ease-in-out;
`;

const MobileMenuList = styled.ul`
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }

  a[aria-current='page'] {
    display: inline-block;
    font-weight: 700;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 24px;
    color: hsl(var(--color-red));
  }

  li {
    padding: 5px 10px;
    border-radius: 24px;
  }

  /* Don't show hover state on touch devices */
  @media (hover: hover) and (pointer: fine) {
    li:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export default function Header({ location }) {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [headerStyles, setHeaderStyles] = useState({
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-black))',
    boxShadow: 'none',
    scrolled: false,
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 24) {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'hsl(var(--color-red))',
        color: 'var(--color-white)',
        boxShadow: '0 1px 3px rgba(57, 63, 72, 0.2);',
        scrolled: true,
      });
    } else {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'transparent',
        color: 'var(--color-black)',
        boxShadow: 'none',
        scrolled: false,
      });
    }
  }

  return (
    <>
      <HeaderStyles
        styles={headerStyles}
        pathname={location.pathname}
        width={width}
      >
        <ContainerStyles>
          <HeaderContentWrapper>
            <Logo />
            <MenuItems>
              {menuItems.map((item, i) => (
                <MenuItem
                  key={i}
                  pathname={location.pathname}
                  scrolled={headerStyles.scrolled}
                  color={item.color}
                >
                  <Link to={item.path}>{item.name}</Link>
                </MenuItem>
              ))}
            </MenuItems>
            {width < 917 && (
              <HamburgerMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                color={
                  location.pathname === '/'
                    ? 'var(--color-white)'
                    : headerStyles.color
                }
              />
            )}
          </HeaderContentWrapper>
        </ContainerStyles>
      </HeaderStyles>
      <MobilMenuBackdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <MobileMenu isOpen={isOpen}>
        <div
          style={{ padding: 30, color: 'var(--color-white)', height: '100%' }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <Link
              to={`/`}
              style={{ color: 'inherit', textDecoration: 'none' }}
              onClick={() => setIsOpen(false)}
            >
              Gallus &amp; Hirundo
            </Link>
          </h3>
          <hr />
          <MobileMenuList
            style={{ marginTop: '2rem', textTransform: 'uppercase' }}
          >
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                <li key={i}>{item.name}</li>
              </Link>
            ))}
          </MobileMenuList>
        </div>
      </MobileMenu>
    </>
  );
}
