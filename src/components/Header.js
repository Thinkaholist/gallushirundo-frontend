import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useWindowSize } from 'react-use';
import { ContainerStyles } from '../styles/ContainerStyles';
import Logo from './Logo';
import HamburgerMenu from './HamurgerMenu';

const menuItems = [
  { name: 'News', path: '/news' },
  { name: 'Events', path: '/events' },
  { name: 'Artists', path: '/artists' },
  { name: 'Contact', path: '/contact' },
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

  li {
    padding: 0 2px;
  }

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

const MobileMenu = styled.div`
  background-color: var(--color-red);
  position: fixed;
  left: 0;
  top: 0;
  width: 80%;
  bottom: 0;
  transform: ${(p) => (!p.isOpen ? 'translateX(-110%)' : 'translateX(0)')};
  transition: all 0.3s ease-in-out;
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

const MobileMenuItem = styled.li`
  a[aria-current='page'] {
    font-weight: 700;
    border-bottom: 2px solid;
  }
`;

export default function Header({ location }) {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  // const { siteSettings } = useStaticQuery(graphql`
  //   query {
  //     siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
  //       title
  //     }
  //   }
  // `);

  const [headerStyles, setHeaderStyles] = useState({
    backgroundColor: 'transparent',
    color: 'var(--color-red)',
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 24) {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'var(--color-red)',
        color: 'var(--color-white)',
        boxShadow: '0 1px 3px rgba(57, 63, 72, 0.2);',
      });
    } else {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'transparent',
        color: 'var(--color-red)',
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
                <li key={i}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
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
        <div style={{ padding: 30, color: 'var(--color-white)' }}>
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
          <ul style={{ marginTop: '2rem', textTransform: 'uppercase' }}>
            {menuItems.map((item, i) => (
              <MobileMenuItem key={i} style={{ marginBottom: '2rem' }}>
                <Link
                  to={item.path}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </MobileMenuItem>
            ))}
          </ul>
        </div>
      </MobileMenu>
    </>
  );
}
