import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';

const isBrowser = typeof window !== 'undefined';

function getHeaderTextColor() {
  if (isBrowser) {
    if (window.location.pathname === '/') {
      return 'var(--color-white)';
    } else {
      return 'var(--color-red)';
    }
  }
}

const HeaderStyles = styled.header`
  background-color: ${(p) => p.styles.backgroundColor};
  /* Fallback until there is no Browser */
  color: #fff;
  color: ${(p) =>
    p.styles.backgroundColor === 'transparent'
      ? getHeaderTextColor()
      : 'var(--color-white)'};
  /* padding: ${(p) => p.styles.padding}; */
  padding: 10px 0;
  box-shadow: ${(p) => p.styles.boxShadow};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 400ms ease;

  /* h1 {
    font-size: ${(p) =>
    p.styles.backgroundColor === 'transparent' ? '40px' : '30px'};
    transition: font-size 500ms ease;
  } */

  h1 {
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuItems = styled.ul`
  font-family: var(--font-family);
  font-weight: 400;
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
`;

export default function Header() {
  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
      }
    }
  `);

  const [headerStyles, setHeaderStyles] = useState({
    backgroundColor: 'transparent',
    padding: '15px 0',
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'var(--color-red)',
        // padding: '5px 0',
        boxShadow: '0 1px 3px rgba(57, 63, 72, 0.2);',
      });
    } else {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'transparent',
        // padding: '15px 0',
      });
    }
  }

  return (
    <>
      <HeaderStyles styles={headerStyles}>
        <ContainerStyles>
          <div
            style={{
              textTransform: 'uppercase',
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h1>
              <Link to='/'>{siteSettings.title}</Link>
            </h1>
            <MenuItems style={{ marginLeft: 'auto', display: 'flex', gap: 60 }}>
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
          </div>
        </ContainerStyles>
      </HeaderStyles>
    </>
  );
}
