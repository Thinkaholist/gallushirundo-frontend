import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';

function getHeaderTextColor() {
  if (window !== undefined) {
    if (window.location.pathname === '/') {
      return 'var(--color-white)';
    } else {
      return 'var(--color-red)';
    }
  }
}

const HeaderStyles = styled.header`
  background-color: ${(p) => p.styles.backgroundColor};
  color: ${(p) =>
    p.styles.backgroundColor === 'transparent'
      ? getHeaderTextColor()
      : 'var(--color-white)'};
  padding: ${(p) => p.styles.padding};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 500ms ease;

  h1 {
    font-size: ${(p) =>
      p.styles.backgroundColor === 'transparent' ? '40px' : '30px'};
    transition: font-size 500ms ease;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: revert;
    }
  }
`;

const MenuItems = styled.ul`
  font-family: FormaDJRTextRegular;
  li {
    padding: 0 2px;
  }

  a {
    letter-spacing: 1px;
  }

  a:hover {
    text-decoration: none;
  }
  a[aria-current='page'] {
    font-family: FormaDJRTextBold;
    border-bottom: 2px solid;
    letter-spacing: 0;
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
    if (currentScroll > 60) {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'var(--color-red)',
        padding: '5px 0',
      });
    } else {
      setHeaderStyles({
        ...headerStyles,
        backgroundColor: 'transparent',
        padding: '15px 0',
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
              fontFamily: 'FormaDJRTextBold',
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
