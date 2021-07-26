import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useWindowSize } from 'react-use';
import { ContainerStyles } from '../styles/ContainerStyles';
import Logo from './Logo';

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
  z-index: 9999;

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

export default function Header({ location }) {
  const { width } = useWindowSize();
  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
      }
    }
  `);

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
              <li>
                <Link to={`/news`}>News</Link>
              </li>
              <li>
                <Link to={`/events`}>Events</Link>
              </li>
              <li>
                <Link to={`/artists`}>Artists</Link>
              </li>
              <li>
                <Link to={`/contact`}>Contact</Link>
              </li>
            </MenuItems>
          </HeaderContentWrapper>
        </ContainerStyles>
      </HeaderStyles>
    </>
  );
}
